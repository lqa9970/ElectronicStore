import Product, { ProductDocument } from '../models/Product'
import { NotFoundError } from '../helpers/apiError'

const findProductById = async (productId: string): Promise<ProductDocument> => {
  const foundProduct = await Product.findById(productId)

  if (!foundProduct) {
    throw new NotFoundError(`Product ${productId} not found`)
  }

  return foundProduct
}

const findAllProducts = async (): Promise<ProductDocument[]> => {
  return Product.find().sort({ name: 1, publishedYear: -1 })
}

const createProduct = async (
  movie: ProductDocument
): Promise<ProductDocument> => {
  return movie.save()
}

const updateProductInfo = async (
  productId: string,
  update: Partial<ProductDocument>
): Promise<ProductDocument | null> => {
  const foundProduct = await Product.findByIdAndUpdate(productId, update, {
    new: true,
  })

  if (!foundProduct) {
    throw new NotFoundError(`Product ${productId} not found`)
  }

  return foundProduct
}

const deleteProduct = async (
  movieId: string
): Promise<ProductDocument | null> => {
  const foundMovie = Product.findByIdAndDelete(movieId)

  if (!foundMovie) {
    throw new NotFoundError(`Product ${movieId} not found`)
  }

  return foundMovie
}

export default {
  createProduct,
  findProductById,
  findAllProducts,
  updateProductInfo,
  deleteProduct,
}
