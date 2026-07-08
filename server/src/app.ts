import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { type Request, type Response } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import authRouter from './routes/auth.routes'

const app = express()

app.use(helmet())
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173',
    credentials: true,
  }),
)
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))

app.use('/api/auth', authRouter)

app.get('/', (_request: Request, response: Response) => {
  response.status(200).json({
    success: true,
    message: 'GMeeting Backend Running',
  })
})

export default app
