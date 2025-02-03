import dotenv from 'dotenv'
import app from './app'
import './config/database'
dotenv.config()
const port = process.env.PORT || 5001
app.listen(port, () => {
  console.log(`apiOrder-Services - Server listen on port http://localhost:${port}`)
})
