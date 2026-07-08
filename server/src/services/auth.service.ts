import User from '../models/User'
import { generateToken } from '../utils/jwt'

type SignupUserData = {
  fullName: string
  email: string
  password: string
}

type LoginUserData = {
  email: string
  password: string
}

export interface AuthResponse {
  user: {
    _id: string
    fullName: string
    email: string
    avatar: string
    role: string
    isVerified: boolean
    createdAt: Date
    updatedAt: Date
  }
  token: string
}

export async function signupUser(data: SignupUserData): Promise<AuthResponse> {
  const normalizedEmail = data.email.toLowerCase()
  const existingUser = await User.findOne({ email: normalizedEmail })

  if (existingUser) {
    throw new Error('Email already exists')
  }

  const user = await User.create({
    fullName: data.fullName,
    email: normalizedEmail,
    password: data.password,
  })

  const userObject = user.toObject()
  const { password, ...userWithoutPassword } = userObject

  const token = generateToken(user._id.toString())

  return {
    user: userWithoutPassword as any,
    token,
  }
}

export async function loginUser(data: LoginUserData): Promise<AuthResponse> {
  const normalizedEmail = data.email.toLowerCase()
  const user = await User.findOne({ email: normalizedEmail })

  if (!user) {
    throw new Error('Invalid email or password')
  }

  const isPasswordValid = await user.comparePassword(data.password)

  if (!isPasswordValid) {
    throw new Error('Invalid email or password')
  }

  const userObject = user.toObject()
  const { password, ...userWithoutPassword } = userObject

  const token = generateToken(user._id.toString())

  return {
    user: userWithoutPassword as any,
    token,
  }
}

export async function getCurrentUser(userId: string): Promise<AuthResponse['user'] | null> {
  const user = await User.findById(userId)
  if (!user) {
    return null
  }

  return {
    _id: user._id.toString(),
    fullName: user.fullName,
    email: user.email,
    avatar: user.avatar,
    role: user.role,
    isVerified: user.isVerified,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
}


