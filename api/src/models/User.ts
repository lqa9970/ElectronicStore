import mongoose, { Document } from 'mongoose'
import { Role } from '../types/types'

export type UserDocument = Document & {
  firstName: string
  lastName: string
  email: string
  role: Role
}

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    index: true,
  },
  lastName: {
    type: String,
    index: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Role,
    default: Role.USER,
  },
})

export default mongoose.model<UserDocument>('User', userSchema)
