import mongoose, { Document } from 'mongoose'
import { Role } from '../types/types'

export type AdminDocument = Document & {
  firstName: string
  lastName: string
  email: string
  role: Role
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
  role: {
    type: String,
    enum: Role,
    default: Role.ADMIN,
  },
})

export default mongoose.model<AdminDocument>('Admin', adminSchema)
