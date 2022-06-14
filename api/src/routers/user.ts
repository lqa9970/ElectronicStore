import express from 'express'
import verifyAuth from '../middlewares/verifyAuth'

import {
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/user'

const router = express.Router()

// router.get('/', getAllUsers)
router.get('/', verifyAuth, getAllUsers)
router.get('/:userId', getUser)
router.post('/', createUser)
router.put('/:userId', updateUser)
router.delete('/:userId', verifyAuth, deleteUser)

export default router
