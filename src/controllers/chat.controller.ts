import { Request, Response } from 'express'
import chatService from '../services/chat.service'

class chatController {
  static async postMessage(req: Request, res: Response) {
    try {
      const { message } = req.body
      const { senderId, receiverId } = req.params
      const chat = await chatService.sendMessage(senderId, receiverId, message)
      res.status(201).json(chat)
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }

  static async getMessages(req: Request, res: Response) {
    try {
      const { userId, contactId } = req.params
      const messages = await chatService.fetchMessages(userId, contactId)
      res.status(200).json(messages)
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }
}

export default chatController
