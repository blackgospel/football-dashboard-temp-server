import * as yup from 'yup'

export const userSchema = yup.object({
  id: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  avatar: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
})

export type UserSchema = yup.InferType<typeof userSchema>
