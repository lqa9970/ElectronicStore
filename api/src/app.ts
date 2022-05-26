import express from 'express'
// import lusca from 'lusca' will be used later
import dotenv from 'dotenv'

import movieRouter from './routers/movie'
import productRouter from './routers/product'
import userRouter from './routers/user'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT || 3000)

// Global middleware
app.use(apiContentType)
app.use(express.json())

// Set up routers
app.use('/movies', movieRouter)
app.use('/products', productRouter)
app.use('/users', userRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
