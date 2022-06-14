import { Request, Response, NextFunction } from 'express'

import Admin from '../models/Admin'
import AdminService from '../services/admin'
import { BadRequestError } from '../helpers/apiError'

export const getAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const adminId = req.params.adminId
    await AdminService.findAdminById(adminId)
    res.json(adminId)
  } catch (err) {
    if (err instanceof Error && err.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', err))
    } else {
      next(err)
    }
  }
}

export const getAllAdmins = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allAdmins = await AdminService.findAllAdmin()
    res.json(allAdmins)
  } catch (err) {
    if (err instanceof Error && err.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', err))
    } else {
      next(err)
    }
  }
}

export const createAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // if(req.user.role !== 'ADMIN') throw ForbiddenError()

    const { firstName, lastName, email, password } = req.body
    const admin = new Admin({ firstName, lastName, email, password })
    res.json(await AdminService.createAdmin(admin))
  } catch (err) {
    if (err instanceof Error && err.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', err))
    } else {
      next(err)
    }
  }
}

export const updateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const adminId = req.params.adminId
    const updatedAdmin = await AdminService.updateAdminInfo(adminId, update)
    res.json(updatedAdmin)
  } catch (err) {
    if (err instanceof Error && err.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', err))
    } else {
      next(err)
    }
  }
}

export const deleteAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const adminId = req.params.adminId
    await AdminService.deleteAdmin(adminId)
    res.status(204).end()
  } catch (err) {
    if (err instanceof Error && err.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', err))
    } else {
      next(err)
    }
  }
}
