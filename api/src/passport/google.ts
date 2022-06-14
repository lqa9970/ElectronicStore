// @ts-ignore
import GoogleStrategy from 'passport-google-id-token'
import User, { UserDocument } from '../models/User'
import UserService from '../services/user'
import AdminService from '../services/admin'
import Admin from '../models/Admin'

const adminEmails = ['anhlequang1998@gmail.com', 'quanganh.le@integrify.io']
const checkAdmin = (email: string) => {
  return adminEmails.includes(email)
}
const loginAuth = () => {
  return new GoogleStrategy(
    {
      clientId: process.env.GOOGLE_CLIENT_ID,
    },
    async (parsedToken: any, googleID: any, done: any) => {
      let user
      const isAdmin = checkAdmin(parsedToken.payload.email)
      if (isAdmin) {
        user = await AdminService.findAdmin(parsedToken.payload.email)
      } else {
        user = await UserService.findOne(parsedToken.payload.email)
      }

      if (!user) {
        user = {
          firstName: parsedToken.payload.given_name,
          lastName: parsedToken.payload.family_name,
          email: parsedToken.payload.email,
          role: isAdmin ? 'ADMIN' : 'USER',
        } as UserDocument

        if (isAdmin) {
          const newUser = new Admin(user)
          await AdminService.createAdmin(newUser)
        } else {
          const newUser = new User(user)
          await UserService.createUser(newUser)
        }
      }
      console.log('user AFTER', user)
      done(null, user)
    }
  )
}

export default loginAuth
