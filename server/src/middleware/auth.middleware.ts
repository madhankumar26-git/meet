import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string
      }
    }
  }
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    res.status(401).json({
      success: false,
      message: 'Authorization token missing',
    })
    return
  }

  const parts = authHeader.split(' ')
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    })
    return
  }

  const token = parts[1]
  const secret = process.env.JWT_SECRET

  if (!secret) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    })
    return
  }

  try {
    const decoded = jwt.verify(token, secret) as { userId: string }

    if (!decoded || typeof decoded !== 'object' || !decoded.userId) {
      res.status(401).json({
        success: false,
        message: 'Invalid or expired token',
      })
      return
    }

    req.user = {
      userId: decoded.userId,
    }

    next()
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    })
    return
  }
}
