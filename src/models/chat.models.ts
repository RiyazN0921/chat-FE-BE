import { Schema, model } from 'mongoose'

const chatSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
  },
  { timestamps: true },
)

export const Chat = model('Chat', chatSchema)
