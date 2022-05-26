import express from 'express'

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
router.post('/', createProduct)
router.put('/:productId', updateProduct)
router.delete('/:productId', deleteProduct)

export default router
