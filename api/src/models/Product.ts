/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type ProductDocument = Document & {
  name: string
  description: string
  img: string
  categories: string[]
  price: number
  quantity: number
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
    index: true,
  },
  img: {
    type: String,
    required: true,
  },
  categories: [String],
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
  },
})

export default mongoose.model<ProductDocument>('Product', productSchema)
