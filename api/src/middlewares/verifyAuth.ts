/**
 * 1. extract the token from the headers
 * 2. run it thru the jwt.verify()
 * 3. MAKE SURE to use the SAME secret that you've used when generating the token
 * 4. if it verifies => you will have a decoded user
 * 5. append the user into the request object so other or next middleware will have know who is the user
 * 6. ERROR handling -> put the code in try catch -> in the catch throw 403 error
 */

import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { ForbiddenError } from '../helpers/apiError'

export default function (req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(' ')[1] as string
    const JWT_SECRET = process.env.JWT_SECRET as string

    const verifiedUser = jwt.verify(token, JWT_SECRET)
    req.user = verifiedUser
    next()
  } catch (error) {
    console.log('error: ', error)
    throw new ForbiddenError()
  }
}
