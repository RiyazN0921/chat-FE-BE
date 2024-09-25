import { Request, Response } from 'express'
import authService from '../services/auth.service'

class authController {
  static async register(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body
      const user = await authService.registerUser(username, email, password)
      res.status(201).json(user)
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      const { user, token } = await authService.loginUser(email, password)
      res.status(200).json({ user, token })
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
}

export default authController
