import { CRUD } from '../common/interfaces/crud.interface'
import TournamentsDao from './tournaments.dao'
import {
  CreateTournamentDto,
  PatchTournamentDto,
  PutTournamentDto,
} from './tournaments.dto'

class TournamentsService implements CRUD {
  async create(resource: CreateTournamentDto) {
    return TournamentsDao.addTournament(resource)
  }

  async deleteById(id: string) {
    return TournamentsDao.removeTournamentById(id)
  }

  async list() {
    return TournamentsDao.getTournaments()
  }

  async patchById(id: string, resource: PatchTournamentDto) {
    return TournamentsDao.updateTournamentById(id, resource)
  }

  async readById(id: string) {
    return TournamentsDao.getTournamentById(id)
  }

  async putById(id: string, resource: PutTournamentDto) {
    return TournamentsDao.updateTournamentById(id, resource)
  }
}

export default new TournamentsService()
