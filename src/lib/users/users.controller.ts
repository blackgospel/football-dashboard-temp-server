import debug from 'debug'
import express from 'express'
import UsersService from './users.service'

const log: debug.IDebugger = debug('app:users-controller')

class UsersController {
  async listUsers(req: express.Request, res: express.Response) {
    const users = await UsersService.list()
    res.status(200).send(users)
  }

  async getUserById(req: express.Request, res: express.Response) {
    const user = await UsersService.readById(req.body.id)
    res.status(200).send(user)
  }

  async createUser(req: express.Request, res: express.Response) {
    const userId = await UsersService.create(req.body)
    res.status(201).send({ id: userId })
  }

  async patch(req: express.Request, res: express.Response) {
    log(await UsersService.patchById(req.body.id, req.body))
    res.status(204).send()
  }

  async put(req: express.Request, res: express.Response) {
    log(await UsersService.putById(req.body.id, req.body))
    res.status(204).send()
  }

  async removeUser(req: express.Request, res: express.Response) {
    log(await UsersService.deleteById(req.body.id))
    res.status(204).send()
  }

  async editNote(req: express.Request, res: express.Response) {
    log(await UsersService.editNote(req.body.id, req.body))
    res.status(204).send()
  }
}

export default new UsersController()
