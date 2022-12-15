import { faker } from '@faker-js/faker'
import debug from 'debug'
import { Db } from '../../database'
import { CreateGeneratedUserDto, PatchUserDto, PutUserDto } from './users.dto'
import { UserSchema } from './users.model'

const log: debug.IDebugger = debug('app:users-dao')

class UsersDao {
  private db: Db = new Db()

  constructor() {
    log('Created new instance of UsersService')
  }

  private generateUser(userFields?: CreateGeneratedUserDto) {
    const userId = faker.datatype.uuid()
    const avatar = faker.datatype.uuid()
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()
    const email = faker.internet.email(firstName, lastName)

    const user: UserSchema = {
      id: userId,
      avatar,
      firstName,
      lastName,
      email,
      ...userFields,
      password: 'password',
    }

    return [userId, user]
  }

  addUser(userFields: CreateGeneratedUserDto) {
    const [userId, user] = this.generateUser(userFields)

    this.db.insert('users', user)

    return userId
  }

  getUserByEmail(email: string) {
    return this.db.getConnection().get('users').find({ email }).value()
  }

  getUserByEmailWithPassword(email: string) {
    const user = this.db.getConnection().get('users').find({ email }).value()

    return user
  }

  removeUserById(userId: string) {
    return this.db.remove('users', userId)
  }

  getUserById(userId: string) {
    return this.db.get('users', userId)
  }

  getUsers() {
    return this.db.all('users')
  }

  updateUserById(userId: string, userFields: PatchUserDto | PutUserDto) {
    const user = this.db.update('users', userId, userFields)
    return (user as UserSchema).id
  }
}

export default new UsersDao()
