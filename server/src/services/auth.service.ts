import User, { type UserDocument } from '../models/User'

type SignupUserData = {
  fullName: string
  email: string
  password: string
}

type LoginUserData = {
  email: string
  password: string
}

export async function signupUser(data: SignupUserData): Promise<UserDocument> {
  const normalizedEmail = data.email.toLowerCase()
  const existingUser = await User.findOne({ email: normalizedEmail })

  if (existingUser) {
    throw new Error('Email already exists')
  }

  return User.create({
    fullName: data.fullName,
    email: normalizedEmail,
    password: data.password,
  })
}

export async function loginUser(data: LoginUserData): Promise<UserDocument> {
  const normalizedEmail = data.email.toLowerCase()
  const user = await User.findOne({ email: normalizedEmail })

  if (!user) {
    throw new Error('Invalid email or password')
  }

  const isPasswordValid = await user.comparePassword(data.password)

  if (!isPasswordValid) {
    throw new Error('Invalid email or password')
  }

  return user
}
