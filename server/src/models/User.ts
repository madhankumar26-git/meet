import bcrypt from 'bcrypt'
import {
  model,
  Schema,
  type HydratedDocument,
  type InferSchemaType,
  type Model,
} from 'mongoose'

const SALT_ROUNDS = 10

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    avatar: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

type UserSchema = InferSchemaType<typeof userSchema>

export type UserDocument = HydratedDocument<UserSchema, UserMethods>

type UserMethods = {
  comparePassword(candidatePassword: string): Promise<boolean>
}

type UserModel = Model<UserSchema, Record<string, never>, UserMethods>

userSchema.pre('save', async function hashPassword() {
  if (!this.isModified('password')) {
    return
  }

  this.password = await bcrypt.hash(this.password, SALT_ROUNDS)
})

userSchema.method('comparePassword', async function comparePassword(
  candidatePassword: string,
) {
  return bcrypt.compare(candidatePassword, this.password)
})

const User = model<UserSchema, UserModel>('User', userSchema)

export default User
