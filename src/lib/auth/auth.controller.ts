import debug from 'debug'
import express from 'express'
import jwt from 'jsonwebtoken'
import { omit } from 'lodash'
import { JWT_EXPIRES_IN, JWT_SECRET_KEY } from '../../constants/jwt'

const log: debug.IDebugger = debug('app:auth-controller')

class AuthController {
  async createJWT(req: express.Request, res: express.Response) {
    try {
      const token = jwt.sign(req.body, JWT_SECRET_KEY, {
        expiresIn: JWT_EXPIRES_IN,
      })
      return res
        .status(201)
        .send({ token, user: omit(req.body.user, ['password', 'id']) })
    } catch (err) {
      log('createJWT error: %O', err)
      return res.status(500).send()
    }
  }

  async verifyJWT(req: express.Request, res: express.Response) {
    const { token, user } = req.body

    return res.status(200).send({ token, user })
  }
}

export default new AuthController()
