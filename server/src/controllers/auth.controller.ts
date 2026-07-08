import type { Request, Response } from 'express'
import { loginUser, signupUser } from '../services/auth.service'
import { loginSchema, signupSchema } from '../validators/auth.validation'

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Something went wrong'
}

export async function signup(request: Request, response: Response) {
  try {
    const validatedData = signupSchema.parse(request.body)
    const { user, token } = await signupUser(validatedData)

    return response.status(201).json({
      success: true,
      message: 'User created successfully',
      user,
      token,
    })
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: getErrorMessage(error),
    })
  }
}

export async function login(request: Request, response: Response) {
  try {
    const validatedData = loginSchema.parse(request.body)
    const { user, token } = await loginUser(validatedData)

    return response.status(200).json({
      success: true,
      message: 'Login successful',
      user,
      token,
    })
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: getErrorMessage(error),
    })
  }
}
