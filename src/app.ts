import express from 'express'
/** **************************************************** */
// middleware
/** **************************************************** */
import morgan from 'morgan'
/** **************************************************** */
import helmet from 'helmet'
/** **************************************************** */
// Rate Limit - Se comenta centralizado en el apigate
import rateLimit from 'express-rate-limit'
/** **************************************************** */
import cors from 'cors'
/** **************************************************** */
// routers
import orderRouter from './routes/orderRouter'
/** **************************************************** */
// Kafka
// const kafkaTopic = 'transaction-success';
// kafkaConsumer(kafkaTopic);
/** **************************************************** */
import errorHandler from './middleware/errorHandlerMid'
const app = express()
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
process.env.NODE_ENV === 'development' ? app?.use(morgan('dev')) : app?.use(morgan('combined'))
app.use(helmet(
  {
    dnsPrefetchControl: false,
    contentSecurityPolicy: false,
    hsts: false,
    frameguard: false,
    // frameguard: { action: "deny" },
    referrerPolicy: false
  }
))
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 50,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests, please try again later.',
  statusCode: 429
})
app.use(limiter)
const corsOptions = {
  origin: process.env.NODE_ENV === 'development'
    ? '*'
    : 'https://your-production-domain.com',
  methods: ['GET', 'POST'], // Permite solo métodos HTTP específicos
  allowedHeaders: ['Content-Type', 'Authorization'], // Permite solo encabezados específicos
  credentials: true // Permite el envío de cookies o credenciales
}
if (process.env.NODE_ENV === 'development') {
  app.use(cors())
} else {
  app.use(cors(corsOptions))
}
/** **************************************************** */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/api', orderRouter)
app.use(errorHandler)
/** **************************************************** */

export default app
