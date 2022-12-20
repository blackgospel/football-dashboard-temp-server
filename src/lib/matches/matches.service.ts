import { CRUD } from '../common/interfaces/crud.interface'
import MatchesDao from './matches.dao'
import { PatchMatchDto, PutMatchDto } from './matches.dto'

class MatchesService implements CRUD {
  async create() {
    return MatchesDao.generateNewMatches()
  }

  async deleteById(id: string) {
    return MatchesDao.removeMatchById(id)
  }

  async list() {
    return MatchesDao.getMatches()
  }

  async patchById(id: string, resource: PatchMatchDto) {
    return MatchesDao.updateMatchById(id, resource)
  }

  async readById(id: string) {
    return MatchesDao.getMatchById(id)
  }

  async putById(id: string, resource: PutMatchDto) {
    return MatchesDao.updateMatchById(id, resource)
  }
}

export default new MatchesService()
