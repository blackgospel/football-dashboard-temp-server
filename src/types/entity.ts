import { MatchesSchema } from '../lib/matches'
import { TeamsSchema } from '../lib/teams'
import { TournamentsSchema } from '../lib/tournaments'
import { UsersSchema } from '../lib/users'

export type Data = {
  users: UsersSchema
  teams: TeamsSchema
  tournaments: TournamentsSchema
  matches: MatchesSchema
}

export type UnpackedData = Unpacked<Data[keyof Data]>

export type InnerData<T extends keyof Data = keyof Data> = Unpacked<Data[T]>

const users: InnerData<'users'> = {
  id: '',
  avatar: '',
  email: '',
  firstName: '',
  lastName: '',
  password: '',
}
