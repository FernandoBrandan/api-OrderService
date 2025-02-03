import mongoose from 'mongoose'
const uri = `${process.env.MONGO_URI}?authSource=admin`
async function connectToDatabase () {
  try {
    await mongoose.connect(uri, {
      auth: {
        username: process.env.MONGO_USERNAME,
        password: process.env.MONGO_PASSWORD
      }
    })
    console.log('Connected to MongoDB')
  } catch (err: any) {
    console.error(`Failed to connect to MongoDB : ${err}`)
  }
}
connectToDatabase()
export default mongoose.connection
