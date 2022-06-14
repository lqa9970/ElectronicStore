import { JWT_SECRET } from './../util/secrets'
import { Request, Response, NextFunction } from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'

export default function (req: Request, res: Response, next: NextFunction) {
  const user = req.user as { id: string; email: string; role: string }
  const JWT_SECRET = process.env.JWT_SECRET as string

  console.log('USER', user)
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    {
      expiresIn: '2d',
    }
  )
  res.json({ token })
}
