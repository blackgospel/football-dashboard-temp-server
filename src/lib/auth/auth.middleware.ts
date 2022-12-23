import debug from 'debug'
import express from 'express'
import jwt from 'jsonwebtoken'
import { UserSchema } from '../users'
import UsersService from '../users/users.service'

const log: debug.IDebugger = debug('app:auth-middleware')
class AuthMiddleware {
  async verifyUserPassword(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await UsersService.getUserByEmailWithPassword(req.body.email)
    if (user) {
      if (user.password === req.body.password) {
        req.body = {
          userId: user.id,
          email: user.email,
          user,
        }
        return next()
      }
    }
    res.status(400).send({ errors: ['Invalid email and/or password'] })
  }

  async verifyRequestToken(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const userPayload = jwt.decode(req.body.token) as UserSchema | undefined

    if (!userPayload) {
      log('No userPayload')
      return res.status(400).send({ errors: ['Invalid token'] })
    }

    const user = await UsersService.getUserByEmailWithPassword(
      userPayload.email
    )

    if (!user) {
      log('No userPayload')
      return res.status(400).send({ errors: ['Malformed token'] })
    }

    req.body.user = user

    return next()
  }
}

export default new AuthMiddleware()
