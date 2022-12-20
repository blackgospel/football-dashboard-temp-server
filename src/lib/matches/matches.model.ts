import * as yup from 'yup'

const statsSchema = yup.array(yup.number()).length(2)

const baseMatchSchema = yup.object({
  id: yup.string().defined(),
  startTimestamp: yup.number().defined(),
  tournamentId: yup.string().defined(),
  homeTeamId: yup.string().defined(),
  awayTeamId: yup.string().defined(),
})

const baseMatchStatisticsSchema = yup.object({
  possession: statsSchema,
  totalShots: statsSchema,
  totalShotsOnTarget: statsSchema,
  offsides: statsSchema,
  fouls: statsSchema,
  goalkeeperSaves: statsSchema,
  corners: statsSchema,
  yellowCards: statsSchema,
})

const matchStatisticsSchema = yup
  .object({
    matchStatistics: baseMatchStatisticsSchema,
  })
  .concat(baseMatchSchema)

const matchSchema = yup
  .object({
    recentGames: yup.array(yup.array(matchStatisticsSchema)),
  })
  .concat(baseMatchSchema)

const matchesSchema = yup.array(matchSchema)

export type MatchSchema = NonNullable<yup.InferType<typeof matchSchema>>

export type MatchesSchema = NonNullable<yup.InferType<typeof matchesSchema>>

export type MatchStatisticsSchema = NonNullable<
  yup.InferType<typeof matchStatisticsSchema>
>

export type StatisticsSchema = NonNullable<yup.InferType<typeof statsSchema>>
