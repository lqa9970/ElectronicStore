import Admin, { AdminDocument } from '../models/Admin'
import { NotFoundError } from '../helpers/apiError'

const findAdmin = async (email: string): Promise<AdminDocument | null> => {
  const foundAdmin = await Admin.findOne({ email })

  return foundAdmin
}
const findAdminById = async (_id: string): Promise<AdminDocument | null> => {
  const foundAdmin = await Admin.findOne({ _id })

  return foundAdmin
}

const findAllAdmin = async (): Promise<AdminDocument[]> => {
  return Admin.find().sort({ name: 1, publishedYear: -1 })
}

const createAdmin = async (user: AdminDocument): Promise<AdminDocument> => {
  return user.save()
}

const updateAdminInfo = async (
  userId: string,
  update: AdminDocument
): Promise<AdminDocument> => {
  const foundAdmin = await Admin.findByIdAndUpdate(userId, update, {
    new: true,
  })
  if (!foundAdmin) {
    throw new NotFoundError(`Admin ${userId} not found`)
  } else return foundAdmin
}

const deleteAdmin = async (userId: string): Promise<AdminDocument> => {
  const foundAdmin = await Admin.findByIdAndDelete(userId)
  if (!foundAdmin) {
    throw new NotFoundError(`Admin ${userId} not found`)
  } else return foundAdmin
}

export default {
  findAdmin,
  findAdminById,
  findAllAdmin,
  createAdmin,
  updateAdminInfo,
  deleteAdmin,
}
