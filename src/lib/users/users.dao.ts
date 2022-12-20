import { faker } from '@faker-js/faker'
import debug from 'debug'
import { Db } from '../../database'
import {
  CreateGeneratedUserDto,
  CreateUserDto,
  PatchUserDto,
  PutUserDto,
} from './users.dto'
import { UserSchema } from './users.model'

const log: debug.IDebugger = debug('app:users-dao')

class UsersDao {
  private db: Db = new Db()
  private dbKey: 'users' = 'users'

  constructor() {
    log('Created new instance of UsersService')
  }

  private createRandomUser(userFields?: CreateGeneratedUserDto) {
    const userId = faker.datatype.uuid()
    const avatar = faker.image.avatar()
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

    return [userId, user] as const
  }

  generateUser() {
    const [userId, user] = this.createRandomUser()

    this.db.insert(this.dbKey, user)

    return userId
  }

  addUser(userFields: CreateUserDto) {
    const [userId, { avatar, firstName, lastName }] =
      this.createRandomUser(userFields)

    this.db.insert(this.dbKey, {
      id: userId,
      avatar,
      firstName,
      lastName,
      ...userFields,
    })

    return userId
  }

  getUserByEmail(email: string) {
    return this.db.getConnection().get(this.dbKey).find({ email }).value()
  }

  getUserByEmailWithPassword(email: string) {
    const user = this.db.getConnection().get(this.dbKey).find({ email }).value()

    return user
  }

  removeUserById(userId: string) {
    this.db.remove(this.dbKey, userId)

    return userId
  }

  getUserById(userId: string) {
    return this.db.get(this.dbKey, userId)
  }

  getUsers() {
    return this.db.all(this.dbKey)
  }

  updateUserById(userId: string, userFields: PatchUserDto | PutUserDto) {
    this.db.update(this.dbKey, userId, userFields)

    return userId
  }
}

export default new UsersDao()
