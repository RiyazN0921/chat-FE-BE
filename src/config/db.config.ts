import mongoose from 'mongoose'

const dbUrl = process.env.MONGO_URL || ''

export const dbConnection = async () => {
  try {
    await mongoose.connect(dbUrl)
    console.log('database connection established')
  } catch (error) {
    console.log(error)
  }
}
