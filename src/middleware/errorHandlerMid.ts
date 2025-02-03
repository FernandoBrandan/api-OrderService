import { NextFunction, Request, Response } from 'express'

interface CustomError extends Error {
  statusCode?: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const error = { ...err }
  error.message = err.message
  res.status(error.statusCode || 500).json({
    error: error.message || 'Server Error'
  })
}
export default errorHandler
