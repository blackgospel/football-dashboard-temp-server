import { faker } from '@faker-js/faker'
import debug from 'debug'
import { Db } from '../../database'
import { CreateTeamDto, PatchTeamDto, PutTeamDto } from './teams.dto'

const log: debug.IDebugger = debug('app:teams-dao')

class TeamsDao {
  private db: Db = new Db()
  private dbKey: 'teams' = 'teams'

  constructor() {
    log('Created new instance of TeamsService')
  }

  addTeam(teamFields: CreateTeamDto) {
    const teamId = faker.datatype.uuid()

    this.db.insert(this.dbKey, {
      id: teamId,
      ...teamFields,
    })

    return teamId
  }

  removeTeamById(teamId: string) {
    this.db.remove(this.dbKey, teamId)

    return teamId
  }

  getTeamById(teamId: string) {
    return this.db.get(this.dbKey, teamId)
  }

  getTeams() {
    return this.db.all(this.dbKey)
  }

  updateTeamById(teamId: string, teamFields: PatchTeamDto | PutTeamDto) {
    this.db.update(this.dbKey, teamId, teamFields)

    return teamId
  }
}

export default new TeamsDao()
