import { CRUD } from '../common/interfaces/crud.interface'
import UsersDao from './users.dao'
import {
  CreateUserDto,
  PatchUserDto,
  PutUserDto,
  PutUserNoteDto,
} from './users.dto'

class UsersService implements CRUD {
  async create(_resource: CreateUserDto) {
    /** When in prod change this to addUser */
    // return UsersDao.addUser(resource)
    return UsersDao.generateUser()
  }

  async deleteById(id: string) {
    return UsersDao.removeUserById(id)
  }

  async list() {
    return UsersDao.getUsers()
  }

  async patchById(id: string, resource: PatchUserDto) {
    return UsersDao.updateUserById(id, resource)
  }

  async readById(id: string) {
    return UsersDao.getUserById(id)
  }

  async putById(id: string, resource: PutUserDto) {
    return UsersDao.updateUserById(id, resource)
  }

  async getUserByEmail(email: string) {
    return UsersDao.getUserByEmail(email)
  }

  async getUserByEmailWithPassword(email: string) {
    return UsersDao.getUserByEmailWithPassword(email)
  }

  async editNote(id: string, resource: PutUserNoteDto) {
    return UsersDao.createOrUpdateContent(id, resource)
  }
}

export default new UsersService()
