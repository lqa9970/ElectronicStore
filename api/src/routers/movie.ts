import express from 'express'

import {
  createMovie,
  findById,
  deleteMovie,
  findAll,
  updateMovie,
} from '../controllers/movie'

const router = express.Router()

// Every path we define here will get /api/v1/movies prefix
router.get('/', findAll)
router.get('/:movieId', findById)
router.post('/', createMovie)
router.put('/:movieId', updateMovie)
router.delete('/:movieId', deleteMovie)

export default router
