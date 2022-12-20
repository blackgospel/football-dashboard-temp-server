import * as yup from 'yup'

export const tournamentSchema = yup.object({
  id: yup.string().required(),
  name: yup.string().required(),
  country: yup.string().required(),
})

export const tournamentsSchema = yup.array(tournamentSchema)

export type TournamentSchema = NonNullable<
  yup.InferType<typeof tournamentSchema>
>

export type TournamentsSchema = NonNullable<
  yup.InferType<typeof tournamentsSchema>
>
