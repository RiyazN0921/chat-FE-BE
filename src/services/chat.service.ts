import { Chat } from '../models/chat.models'

class chatService {
  static async sendMessage(
    senderId: string,
    receiverId: string,
    message: string,
  ) {
    const newMessage = new Chat({
      sender: senderId,
      receiver: receiverId,
      message,
    })
    await newMessage.save()
    return newMessage
  }

  static async fetchMessages(userId: string, contactId: string) {
    return Chat.find({
      $or: [
        { sender: userId, receiver: contactId },
        { sender: contactId, receiver: userId },
      ],
    }).sort({ createdAt: -1 })
  }
}

export default chatService
