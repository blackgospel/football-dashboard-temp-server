import * as yup from 'yup'

const userNotesSchema = yup
  .array(
    yup.object({
      id: yup.string().defined(),
      content: yup.string().defined(),
    })
  )
  .optional()

export const userSchema = yup
  .object({
    id: yup.string().defined(),
    firstName: yup.string().defined(),
    lastName: yup.string().defined(),
    avatar: yup.string().defined(),
    email: yup.string().email().defined(),
    password: yup.string().defined(),
    notes: userNotesSchema,
  })
  .defined()

export const usersSchema = yup.array(userSchema)

export type UserSchema = NonNullable<yup.InferType<typeof userSchema>>

export type UsersSchema = NonNullable<yup.InferType<typeof usersSchema>>
