import User, { UserDocument } from '../models/User'
import { NotFoundError } from '../helpers/apiError'

const createUser = async (user: UserDocument): Promise<UserDocument> => {
  return user.save()
}

const findUserById = async (userId: string): Promise<UserDocument> => {
  const foundUser = await User.findById(userId)

  if (!foundUser) {
    throw new NotFoundError(`Product ${userId} not found`)
  }

  return foundUser
}

const findAllUser = async (): Promise<UserDocument[]> => {
  return User.find().sort({ name: 1, publishedYear: -1 })
}

const updateUserInfo = async (
  userId: string,
  update: UserDocument
): Promise<UserDocument> => {
  const foundUser = await User.findByIdAndUpdate(userId, update, { new: true })
  if (!foundUser) {
    throw new NotFoundError(`USer ${userId} not found`)
  } else return foundUser
}

const deleteUser = async (userId: string): Promise<UserDocument> => {
  const foundUser = await User.findByIdAndDelete(userId)
  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  } else return foundUser
}

export default {
  createUser,
  findUserById,
  findAllUser,
  updateUserInfo,
  deleteUser,
}
