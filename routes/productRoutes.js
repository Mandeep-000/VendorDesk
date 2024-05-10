import express from 'express';
const router = express.Router();

import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
  showStats,
  setSalesPurchase,
  getAllOrders,
  deleteOrder,
} from '../controllers/productController.js';

import testUser from '../middleware/testUser.js';

router.route('/').post(testUser, createProduct).get(getAllProducts);
// remember about :id
router.route('/stats').get(showStats);
router.route('/order').get(getAllOrders);
router.route('/order/:id').delete(testUser, deleteOrder).patch(testUser, setSalesPurchase);
router.route('/:id').delete(testUser, deleteProduct).patch(testUser, updateProduct);

export default router;
