import Product from "../models/Product.js";
import Sales from "../models/Sales.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";

import checkPermissions from "../utils/checkPermissions.js";
import mongoose from "mongoose";
import moment from "moment";


const createProduct = async (req, res) => {
  const { name, brand } = req.body;

  if (!name || !brand) {
    throw new BadRequestError("Please provide all values");
  }

  req.body.createdBy = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};


const getAllProducts = async (req, res) => {
  const { brand, quantity, price, sort, search } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };
  // add stuff based on condition

  if (quantity && quantity !== "all") {
    if (quantity === "out of stock") {
      queryObject.quantity = 0;
    } else if (quantity === "few") {
      queryObject.quantity = { $gt: 0, $lte: 5 };
    } else if (quantity === "average") {
      queryObject.quantity = { $gt: 5, $lte: 15 };
    } else if (quantity === "sufficient") {
      queryObject.quantity = { $gt: 15 };
    }
  }

  if (price && price !== "all") {
    if (price === "1-100") {
      queryObject.price = { $gt: 0, $lte: 100 };
    } else if (price === "101-500") {
      queryObject.price = { $gt: 100, $lte: 500 };
    } else if (price === "501-2000") {
      queryObject.price = { $gt: 500, $lte: 2000 };
    } else if (price === "2001-10000") {
      queryObject.price = { $gt: 2000, $lte: 10000 };
    } else if (price === ">10000") {
      queryObject.price = { $gt: 10000 };
    }
  }

  if (brand) {
    queryObject.brand = { $regex: brand, $options: "i" };;
  }
  if (search) {
    queryObject.name = { $regex: search, $options: "i" };
  }
  // NO AWAIT

  let result = Product.find(queryObject);

  // chain sort conditions

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("name");
  }
  if (sort === "z-a") {
    result = result.sort("-name");
  }

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;

  const totalProducts = await Product.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalProducts / limit);

  res.status(StatusCodes.OK).json({ products, totalProducts, numOfPages });
};


const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const { name, brand } = req.body;

  if (!name || !brand) {
    throw new BadRequestError("Please provide all values");
  }
  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new NotFoundError(`No product with id :${productId}`);
  }
  // check permissions

  checkPermissions(req.user, product.createdBy);

  const updatedProduct = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ updatedProduct });
};


const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new NotFoundError(`No product with id :${productId}`);
  }

  checkPermissions(req.user, product.createdBy);

  await product.remove();
  
  res.status(StatusCodes.OK).json({ msg: "Success! Product removed" });
};

const deleteOrder = async (req, res) => {
  const { id: orderId } = req.params;

  const order = await Sales.findOne({ _id: orderId });

  if (!order) {
    throw new NotFoundError(`No order with id :${orderId}`);
  }

  checkPermissions(req.user, order.createdBy);

  await order.remove();
  
  res.status(StatusCodes.OK).json({ msg: "Success! Order removed" });
};


const showStats = async (req, res) => {
  const queryObject = {
    createdBy: req.user.userId,
  };
  const totalProducts = await Product.countDocuments(queryObject);

  let stats = await Product.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$quantity", count: { $sum: 1 } } },
  ]);
  
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  
  const defaultStats = {
    outOfStock: stats[0] || 0,
  };

  let monthlySales = await Sales.aggregate([
    { $match: { 
        createdBy: mongoose.Types.ObjectId(req.user.userId),
        exchangeType: 'sales',
      }
    },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
        saleCount: { $sum: "$quantity" },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlySales = monthlySales
    .map((item) => {
      const {
        _id: { year, month },
        count,
        saleCount
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count, saleCount };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlySales, totalProducts });
};


const setSalesPurchase = async (req, res) => {
  const { exchangeQuantity: quantity, price, exchangeType } = req.body;
  const { id } = req.params; // Product ID

  if (!quantity || !exchangeType) {
    throw new BadRequestError("Please provide all values");
  }


  // Update product quantity based on exchangeType
  const product = await Product.findOne({_id: id});
  if (!product) {
    throw new NotFoundError(`No product with id :${id}`);
  }

  if(exchangeType === 'sales' && quantity > product.quantity){
    throw new BadRequestError('Sales Quantity cannot be more than stock');
  }

  
  if (exchangeType === 'sales') {
    product.quantity -= Number(quantity);
  } else if (exchangeType === 'purchase') {
    product.quantity += Number(quantity);
  }

    // Create a new sales/purchase entry
    const newSales = await Sales.create({
      quantity,
      revisedStock: product.quantity,
      price,
      exchangeType,
      product: id,
      createdBy: req.user.userId, // Assuming user ID is stored in req.user.userId
    });

  await product.save();

  res.status(StatusCodes.CREATED).json({ newSales });
};

const getAllOrders = async (req, res) => {
 
  const { quantity, type, dateFrom, dateTo, sort, search } = req.query;

  const queryObject1 = {
    createdBy: mongoose.Types.ObjectId(req.user.userId),
  };
  const queryObject = new Object

  if (quantity && quantity !== "all") {
    if (quantity === "few") {
      queryObject.quantity = { $gt: 0, $lte: 5 };
    } else if (quantity === "average") {
      queryObject.quantity = { $gt: 5, $lte: 15 };
    } else if (quantity === "sufficient") {
      queryObject.quantity = { $gt: 15 };
    }
  }


  if (type && type !== "all") {
    if (type === "sold") {
      queryObject.exchangeType = 'sales';
    } else if (type === "purchased") {
      queryObject.exchangeType = 'purchase';
    }
  }

  if (search) {
    queryObject['productDetails.name'] = { $regex: search, $options: "i" };
  }

  if (dateFrom && dateTo) {
    const endOfDay = new Date(dateTo);
  endOfDay.setHours(23, 59, 59, 999); // Set the time to the end of the day
  queryObject.createdAt = {
    $gte: new Date(dateFrom), // Greater than or equal to dateFrom
    $lte: endOfDay,            // Less than or equal to the end of the day of dateTo
  };
  }
 
  let result = await Sales.aggregate([
    { $match: queryObject1 },
    {
      $lookup: {
        from: "products", // name of the Product collection
        localField: "product",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $unwind: "$productDetails",
    },
    { $match: queryObject },
  ]);
  


  // chain sort conditions
  if (sort === "latest") {
    result = result.sort((a, b) => a.createdAt - b.createdAt);
  }
  if (sort === "oldest") {
    result = result.sort((a, b) => b.createdAt - a.createdAt);
  }
  if (sort === "a-z") {
    result = result.sort((a, b) => a.productDetails.name.localeCompare(b.productDetails.name));
  }
  if (sort === "z-a") {
    result = result.sort((a, b) => b.productDetails.name.localeCompare(a.productDetails.name));
  }

  const orders = result;
  const totalOrders = await Sales.countDocuments(queryObject);

  res.status(StatusCodes.OK).json({ orders, totalOrders });
};


export { createProduct, deleteProduct, getAllProducts, updateProduct, showStats, setSalesPurchase, getAllOrders, deleteOrder };
