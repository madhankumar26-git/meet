import dotenv from 'dotenv'
dotenv.config()

import app from './app'
import { connectDatabase } from './config/database'

const port = Number(process.env.PORT) || 5000

async function startServer() {
  await connectDatabase()

  app.listen(port, () => {
    console.log(`GMeeting backend running on port ${port}`)
  })
}

void startServer()
