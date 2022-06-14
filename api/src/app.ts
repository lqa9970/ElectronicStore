import express from 'express'
// import lusca from 'lusca' will be used later
import dotenv from 'dotenv'
import cors from 'cors'
import passport from 'passport'
import jwt from 'jsonwebtoken'

import movieRouter from './routers/movie'
import productRouter from './routers/product'
import userRouter from './routers/user'
import adminRouter from './routers/admin'

import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import sendTokenToFront from './middlewares/sendTokenToFront'

import loginAuth from './passport/google'
import verifyAuth from './middlewares/verifyAuth'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT || 3000)

// Global middleware
app.use(apiContentType)
app.use(express.json())
app.use(cors())

app.use(passport.initialize())
passport.use(loginAuth())

app.post(
  '/google-login',
  passport.authenticate('google-id-token', { session: false }),
  sendTokenToFront
)

// Set up routers
app.post('/verify-token', verifyAuth, (req, res) => {
  const user = req.user
  res.json({ user })
  console.log('user: ', user)
})

app.use('/api/v1/movies', movieRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/admins', adminRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
