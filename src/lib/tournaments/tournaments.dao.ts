import { faker } from '@faker-js/faker'
import debug from 'debug'
import { Db } from '../../database'
import {
  CreateTournamentDto,
  PatchTournamentDto,
  PutTournamentDto,
} from './tournaments.dto'

const log: debug.IDebugger = debug('app:tournaments-dao')

class TournamentsDao {
  private db: Db = new Db()
  private dbKey: 'tournaments' = 'tournaments'

  constructor() {
    log('Created new instance of TournamentsService')
  }

  addTournament(tournamentFields: CreateTournamentDto) {
    const tournamentId = faker.datatype.uuid()

    this.db.insert(this.dbKey, {
      id: tournamentId,
      ...tournamentFields,
    })

    return tournamentId
  }

  removeTournamentById(tournamentId: string) {
    this.db.remove(this.dbKey, tournamentId)

    return tournamentId
  }

  getTournamentById(tournamentId: string) {
    return this.db.get(this.dbKey, tournamentId)
  }

  getTournaments() {
    return this.db.all(this.dbKey)
  }

  updateTournamentById(
    tournamentId: string,
    tournamentFields: PatchTournamentDto | PutTournamentDto
  ) {
    this.db.update(this.dbKey, tournamentId, tournamentFields)

    return tournamentId
  }
}

export default new TournamentsDao()
