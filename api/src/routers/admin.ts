import express from 'express'

import {
  getAdmin,
  getAllAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from '../controllers/Admin'

const router = express.Router()

router.get('/', getAllAdmins)
router.get('/:adminId', getAdmin)
router.post('/', createAdmin)
router.put('/:adminId', updateAdmin)
router.delete('/:adminId', deleteAdmin)

export default router
