import mongoose, { Document } from 'mongoose'

export type AdminDocument = Document & {
  firstName: string
  lastName: string
  email: string
  isAdmin: boolean
}

const adminSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    index: true,
  },
  lastName: {
    type: String,
    required: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

export default mongoose.model<AdminDocument>('Admin', adminSchema)
