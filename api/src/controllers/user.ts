import { Request, Response, NextFunction } from 'express'

import User from '../models/User'
import UserService from '../services/user'
import { BadRequestError, ForbiddenError } from '../helpers/apiError'

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId
    const data = await UserService.findUserById(userId)
    res.json(data)
  } catch (err) {
    if (err instanceof Error && err.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', err))
    } else {
      next(err)
    }
  }
}

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const signedIn = req.user as { role: 'ADMIN' | 'USER' }
    const isAdmin = signedIn.role === 'ADMIN'
    if (isAdmin) {
      const users = await UserService.findAllUser()
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

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, password } = req.body
    const user = new User({ firstName, lastName, email, password })
    res.json(await UserService.createUser(user))
  } catch (err) {
    if (err instanceof Error && err.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', err))
    } else {
      next(err)
    }
  }
}

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const userId = req.params.userId
    const updatedUser = await UserService.updateUserInfo(userId, update)
    res.json(updatedUser)
  } catch (err) {
    if (err instanceof Error && err.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', err))
    } else {
      next(err)
    }
  }
}

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId
    await UserService.deleteUser(userId)
    res.status(204).end()
  } catch (err) {
    if (err instanceof Error && err.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', err))
    } else {
      next(err)
    }
  }
}
