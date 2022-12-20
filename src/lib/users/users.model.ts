import * as yup from 'yup'

export const userSchema = yup
  .object({
    id: yup.string().defined(),
    firstName: yup.string().defined(),
    lastName: yup.string().defined(),
    avatar: yup.string().defined(),
    email: yup.string().email().defined(),
    password: yup.string().defined(),
  })
  .defined()

export const usersSchema = yup.array(userSchema)

export type UserSchema = NonNullable<yup.InferType<typeof userSchema>>

export type UsersSchema = NonNullable<yup.InferType<typeof usersSchema>>
