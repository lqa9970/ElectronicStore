import { Request, Response, NextFunction } from 'express'

import Order from '../models/Order'
import OrderService from '../services/Order'
import { BadRequestError, ForbiddenError } from '../helpers/apiError'

export const findOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = req.params.orderId
    const data = await OrderService.findOrderById(orderId)
    res.json(data)
  } catch (err) {
    if (err instanceof Error && err.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', err))
    } else {
      next(err)
    }
  }
}

export const findOrderByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params
    const orders = await OrderService.findOrdersByUserId(userId)
    res.json(orders)
  } catch (err) {
    if (err instanceof Error && err.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', err))
    } else {
      next(err)
    }
  }
}

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const signedIn = req.user as { role: 'ADMIN' | 'USER' }
    const isAdmin = signedIn.role === 'ADMIN'
    if (isAdmin) {
      const users = await OrderService.findAllOrders()
      res.json(users)
    } else throw new ForbiddenError()
  } catch (err) {
    if (err instanceof Error && err.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', err))
    } else {
      next(err)
    }
  }
}

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user, products } = req.body
    const order = new Order({ user, products })
    res.json(await OrderService.createOrder(order))
  } catch (err) {
    if (err instanceof Error && err.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', err))
    } else {
      next(err)
    }
  }
}
