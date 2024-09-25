import { Router } from 'express'
import authRouter from './auth.routes'
import chatRouter from './chat.routes'

const mainRouter = Router()

mainRouter.get('/status', (req, res) => {
  res.status(200).send('ok')
})

mainRouter.use('/auth', authRouter)

mainRouter.use('/chat', chatRouter)

export default mainRouter
