import { Router } from 'express'
import chatController from '../controllers/chat.controller'

const chatRouter = Router()

chatRouter.post('/messages/:senderId/:receiverId', chatController.postMessage)

chatRouter.get('/messages/:userId/:contactId', chatController.getMessages)

export default chatRouter
