import debug from 'debug'
import express from 'express'
import TeamsService from './teams.service'

const log: debug.IDebugger = debug('app:teams-controller')

class TeamsController {
  async listTeams(req: express.Request, res: express.Response) {
    const teams = await TeamsService.list()
    res.status(200).send(teams)
  }

  async getTeamById(req: express.Request, res: express.Response) {
    const team = await TeamsService.readById(req.body.id)
    res.status(200).send(team)
  }

  async createTeam(req: express.Request, res: express.Response) {
    const teamId = await TeamsService.create(req.body)
    res.status(201).send({ id: teamId })
  }

  async patch(req: express.Request, res: express.Response) {
    log(await TeamsService.patchById(req.body.id, req.body))
    res.status(204).send()
  }

  async put(req: express.Request, res: express.Response) {
    log(await TeamsService.putById(req.body.id, req.body))
    res.status(204).send()
  }

  async removeTeam(req: express.Request, res: express.Response) {
    log(await TeamsService.deleteById(req.body.id))
    res.status(204).send()
  }
}

export default new TeamsController()
