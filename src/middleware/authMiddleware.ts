import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const setupAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      throw new Error("No headers.authorization provided")
    }
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1] 
    if (!token || token === "null") {
      throw new Error("No token provided")
    }
    const user = jwt.verify(token, process.env.TOKEN_SECRET || "secret");
    console.log(user , "guardar lejado---falta configurar en gateway");  
    
    next();
  } catch (error) {
    next(error)
  } 
};

export default setupAuth;
