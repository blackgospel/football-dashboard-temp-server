import { CRUD } from '../common/interfaces/crud.interface'
import TeamsDao from './teams.dao'
import { CreateTeamDto, PatchTeamDto, PutTeamDto } from './teams.dto'

class TeamsService implements CRUD {
  async create(resource: CreateTeamDto) {
    return TeamsDao.addTeam(resource)
  }

  async deleteById(id: string) {
    return TeamsDao.removeTeamById(id)
  }

  async list() {
    return TeamsDao.getTeams()
  }

  async patchById(id: string, resource: PatchTeamDto) {
    return TeamsDao.updateTeamById(id, resource)
  }

  async readById(id: string) {
    return TeamsDao.getTeamById(id)
  }

  async putById(id: string, resource: PutTeamDto) {
    return TeamsDao.updateTeamById(id, resource)
  }
}

export default new TeamsService()
