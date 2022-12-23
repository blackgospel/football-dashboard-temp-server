import { faker } from '@faker-js/faker'
import {
  MatchesSchema,
  MatchStatisticsSchema,
  StatisticsSchema,
} from '../lib/matches'
import { TeamSchema, TeamsSchema } from '../lib/teams'
import { TournamentSchema, TournamentsSchema } from '../lib/tournaments'

const randomTeamIndex = (length: number) => {
  return faker.datatype.number({
    min: 0,
    max: length - 1,
  })
}

const randomAverageStats = (
  lower = 40,
  upper = 60,
  diff = false
): StatisticsSchema => {
  const homeStat = faker.datatype.number({ min: lower, max: upper })
  const awayStat = diff
    ? 100 - homeStat
    : faker.datatype.number({ min: lower, max: upper })

  return [homeStat, awayStat]
}

export const generateMatches = (
  tournaments: TournamentsSchema,
  teams: TeamsSchema
) => {
  let matches: MatchesSchema = []

  //Loop through each tournament to generate random matches for them all
  tournaments.forEach(tournament => {
    const tournamentTeams = teams.filter(
      ({ tournamentId }) => tournament.id === tournamentId
    )
    const tournamentMatches = generateTournamentMatches(
      tournament,
      tournamentTeams
    )

    matches = [...matches, ...tournamentMatches]
  })

  return matches
}

const generateTournamentMatches = (
  tournament: TournamentSchema,
  teams: TeamsSchema
) => {
  const numOfMatches = faker.datatype.number({ min: 1, max: 6 })

  return Array(numOfMatches)
    .fill(undefined)
    .map(() => {
      const homeIndex = randomTeamIndex(teams.length)
      const awayIndex = randomTeamIndex(teams.length)

      const home = teams[homeIndex]
      const away = teams[awayIndex]

      return generateMatch({ home, away, teams, tournament })
    })
}

const generateMatch = ({
  home,
  away,
  tournament,
  teams,
}: {
  home: TeamSchema
  away: TeamSchema
  tournament: TournamentSchema
  teams: TeamsSchema
}) => {
  return {
    id: faker.datatype.uuid(),
    startTimestamp: new Date(faker.date.soon(0)).getTime(),
    tournament,
    homeTeam: home,
    awayTeam: away,
    recentGames: [
      generateTeamPreviousStats(home, teams, tournament),
      generateTeamPreviousStats(away, teams, tournament),
    ],
  }
}

const generateTeamPreviousStats = (
  team: TeamSchema,
  teams: TeamsSchema,
  tournament: TournamentSchema
): MatchStatisticsSchema[] => {
  const filteredTeams = teams.filter(({ id }) => team.id !== id)

  return Array(10)
    .fill(0)
    .map(() => {
      const shouldBeHomeTeam = faker.datatype.boolean()
      const randomTeamsIndex = randomTeamIndex(filteredTeams.length)
      const oppositionTeam = teams[randomTeamsIndex]

      return {
        id: faker.datatype.uuid(),
        startTimestamp: new Date(faker.date.soon(0)).getTime(),
        tournament,
        homeTeam: shouldBeHomeTeam ? team : oppositionTeam,
        awayTeam: !shouldBeHomeTeam ? team : oppositionTeam,
        matchStatistics: generateRecentGameStats(),
      }
    })
}

const generateRecentGameStats =
  (): MatchStatisticsSchema['matchStatistics'] => {
    return {
      possession: randomAverageStats(40, 60, true),
      totalShots: randomAverageStats(6, 23),
      totalShotsOnTarget: randomAverageStats(1, 8),
      offsides: randomAverageStats(1, 4),
      fouls: randomAverageStats(6, 20),
      goalkeeperSaves: randomAverageStats(0, 2),
      corners: randomAverageStats(2, 13),
      yellowCards: randomAverageStats(0, 5),
    }
  }
