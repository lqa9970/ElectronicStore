import express from 'express'
import verifyAuth from '../middlewares/verifyAuth'

import {
  getProduct,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product'

const router = express.Router()

router.get('/', getAllProducts)
router.get('/:productId', getProduct)
router.post('/', verifyAuth, createProduct)
router.put('/:productId', verifyAuth, updateProduct)
router.delete('/:productId', deleteProduct)

export default router
