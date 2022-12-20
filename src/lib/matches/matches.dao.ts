import { faker } from '@faker-js/faker'
import debug from 'debug'
import { Db } from '../../database'
import { generateMatches } from '../../helpers/generate-matches'
import { TeamsSchema } from '../teams'
import { TournamentsSchema } from '../tournaments'
import { CreateMatchDto, PatchMatchDto, PutMatchDto } from './matches.dto'
import { MatchesSchema } from './matches.model'

const log: debug.IDebugger = debug('app:matches-dao')

class MatchesDao {
  private db: Db = new Db()
  private dbKey: 'matches' = 'matches'

  constructor() {
    log('Created new instance of MatchesService')
  }

  generateNewMatches() {
    const teams = this.db.all('teams')
    const tournaments = this.db.all('tournaments')

    const generatedMatches: MatchesSchema = generateMatches(
      tournaments as TournamentsSchema,
      teams as TeamsSchema
    )

    console.log({
      test: generatedMatches,
    })

    this.db
      .getConnection()
      .get('matches')
      .push(...generatedMatches)
      .write()
  }

  addMatch(matchFields: CreateMatchDto) {
    const matchId = faker.datatype.uuid()

    this.db.insert(this.dbKey, {
      id: matchId,
      ...matchFields,
    })

    return matchId
  }

  removeMatchById(matchId: string) {
    this.db.remove(this.dbKey, matchId)

    return matchId
  }

  getMatchById(matchId: string) {
    return this.db.get(this.dbKey, matchId)
  }

  getMatches() {
    return this.db.all(this.dbKey)
  }

  updateMatchById(matchId: string, matchFields: PatchMatchDto | PutMatchDto) {
    this.db.update(this.dbKey, matchId, matchFields)

    return matchId
  }
}

export default new MatchesDao()
