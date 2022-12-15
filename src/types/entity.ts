import { UserSchema } from '../lib/users'

export type TeamData = {}

export type MatchesData = {}

export type TournamentData = {}

export type Data = {
  users: UserSchema[]
  matches: MatchesData[]
  tournaments: TournamentData[]
}
