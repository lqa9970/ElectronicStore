import { Request, Response, NextFunction } from 'express'

import Product from '../models/Product'
import ProductService from '../services/product'
import { BadRequestError } from '../helpers/apiError'

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.productId
    res.json(await ProductService.findProductById(productId))
  } catch (err) {
    if (err instanceof Error && err.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', err))
    } else {
      next(err)
    }
  }
}

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await ProductService.findAllProducts()
    res.json(products)
  } catch (err) {
    if (err instanceof Error && err.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', err))
    } else {
      next(err)
    }
  }
}

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, img, categories, price, quantity } = req.body
    const product = new Product({
      name,
      description,
      img,
      categories,
      price,
      quantity,
    })
    await ProductService.createProduct(product)
    res.json(product)
  } catch (err) {
    if (err instanceof Error && err.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', err))
    } else {
      next(err)
    }
  }
}

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const productId = req.params.productId
    const updatedProduct = await ProductService.updateProductInfo(
      productId,
      update
    )
    res.json(updatedProduct)
  } catch (err) {
    if (err instanceof Error && err.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', err))
    } else {
      next(err)
    }
  }
}

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.productId
    await ProductService.deleteProduct(productId)
    res.status(204).end()
  } catch (err) {
    if (err instanceof Error && err.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', err))
    } else {
      next(err)
    }
  }
}
