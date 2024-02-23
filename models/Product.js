import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
  {
      name: {
        type: String,
        required: [true, 'Please provide name of the product'],
        maxlength: 50,
      },
    brand: {
      type: String,
      required: [true, 'Please provide brand name'],
      maxlength: 50,
    },
    quantity: {
      type: Number,
      required: [true, 'Please provide quantity'],
      default: '1',
    },
    price: {  
      type: Number,
      required: [true, 'Please provide price'],
    },
    weight: {
      type: String,
      default: '0',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

export default mongoose.model('Product', ProductSchema)
