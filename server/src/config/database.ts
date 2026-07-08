import mongoose from 'mongoose'

export async function connectDatabase() {
  const mongoUri = process.env.MONGODB_URI

  if (!mongoUri) {
    console.error('MongoDB connection failed: MONGODB_URI is not defined')
    process.exit(1)
  }

  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 1000 })
    console.log('MongoDB connected successfully')
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.log('MongoDB connected successfully')
      return
    }
    console.error('MongoDB connection failed:', error)
    process.exit(1)
  }
}
