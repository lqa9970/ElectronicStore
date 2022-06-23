import Order, { OrderDocument } from '../models/Order'
import { NotFoundError } from '../helpers/apiError'

const findOrdersByUserId = async (userId: string): Promise<OrderDocument[]> => {
  const foundOrder = await Order.find({ user: userId })
    .populate('products')
    .populate('user')
  if (!foundOrder) {
    throw new NotFoundError(`Order ${userId} not found`)
  }

  return foundOrder
}

const findOrderById = async (orderId: string): Promise<OrderDocument[]> => {
  const foundOrder = await Order.find({ order: orderId }).populate('products')
  if (!foundOrder) {
    throw new NotFoundError(`Order ${orderId} not found`)
  }

  return foundOrder
}

const findAllOrders = async (): Promise<OrderDocument[]> => {
  return Order.find()
    .sort({ name: 1, publishedYear: -1 })
    .populate('user')
    .populate('products')
}

const createOrder = async (order: OrderDocument): Promise<OrderDocument> => {
  return order.save()
}

const updateOrderInfo = async (
  orderId: string,
  update: Partial<OrderDocument>
): Promise<OrderDocument | null> => {
  const foundOrder = await Order.findByIdAndUpdate(orderId, update, {
    new: true,
  })

  if (!foundOrder) {
    throw new NotFoundError(`Order ${orderId} not found`)
  }

  return foundOrder
}

const deleteOrder = async (movieId: string): Promise<OrderDocument | null> => {
  const foundMovie = Order.findByIdAndDelete(movieId)

  if (!foundMovie) {
    throw new NotFoundError(`Order ${movieId} not found`)
  }

  return foundMovie
}

export default {
  findOrderById,
  createOrder,
  findOrdersByUserId,
  findAllOrders,
  updateOrderInfo,
  deleteOrder,
}
