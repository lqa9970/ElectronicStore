import express from 'express'

import {
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/user'

const router = express.Router()

router.get('/', getAllUsers)
router.get('/:userId', getUser)
router.post('/', createUser)
router.put('/:userId', updateUser)
router.delete('/:userId', deleteUser)

export default router
