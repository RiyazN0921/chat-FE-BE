import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import http from 'http'
import { Server } from 'socket.io'
import mainRouter from './src/routes/index.routes'
import { dbConnection } from './src/config/db.config'
import path from 'path'
import chatService from './src/services/chat.service'

dotenv.config()

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static(path.join(__dirname, 'public')))

app.use(cors())
app.use(bodyParser.json())

app.use('/api', mainRouter)

io.on('connection', (socket) => {
  console.log('A user connected')

  socket.on('chatMessage', async ({ senderId, receiverId, message }) => {
    const newMessage = await chatService.sendMessage(
      senderId,
      receiverId,
      message,
    )

    io.emit('chatMessage', newMessage)
  })

  socket.on('disconnect', () => {
    console.log('A user disconnected')
  })
})

server.listen(process.env.PORT || 3000, async () => {
  await dbConnection()
  console.log(`Server running on port ${process.env.PORT}`)
})
