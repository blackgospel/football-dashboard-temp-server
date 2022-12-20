import * as yup from 'yup'

export const teamSchema = yup.object({
  id: yup.string().required(),
  tournamentId: yup.string().required(),
  name: yup.string().required(),
  code: yup.string().required(),
  country: yup.string().required(),
})

export const teamsSchema = yup.array(teamSchema)

export type TeamSchema = NonNullable<yup.InferType<typeof teamSchema>>

export type TeamsSchema = NonNullable<yup.InferType<typeof teamsSchema>>
