import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.models'
import dotenv from 'dotenv'

dotenv.config()

class authService {
  static async registerUser(username: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ username, email, password: hashedPassword })
    await newUser.save()
    return newUser
  }

  static async loginUser(email: string, password: string) {
    const user = await User.findOne({ email })
    if (!user) throw new Error('Invalid email or password')

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new Error('Invalid email or password')

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    })
    return { user, token }
  }
}

export default authService
