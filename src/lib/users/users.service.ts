import { CRUD } from '../common/interfaces/crud.interface'
import UsersDao from './users.dao'
import { CreateUserDto, PatchUserDto, PutUserDto } from './users.dto'

class UsersService implements CRUD {
  async create(resource: CreateUserDto) {
    return UsersDao.addUser(resource)
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
}

export default new UsersService()
