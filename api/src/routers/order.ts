import express from 'express'
import verifyAuth from '../middlewares/verifyAuth'

import {
  createOrder,
  findOrderByUserId,
  getAllOrders,
} from '../controllers/order'

const router = express.Router()

router.get('/', verifyAuth, getAllOrders)
router.get('/:userId', findOrderByUserId)
router.post('/', createOrder)

export default router
