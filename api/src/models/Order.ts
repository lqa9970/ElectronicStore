/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type OrderDocument = Document & {
  user: string
  products: string[]
}

const orderSchema = new mongoose.Schema({
  // One to One relation user - order
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  // One to Many relation one Order - to Many products
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
})

export default mongoose.model<OrderDocument>('Order', orderSchema)
