import debug from 'debug'
import express from 'express'
import MatchesService from './matches.service'

const log: debug.IDebugger = debug('app:matches-controller')

class MatchesController {
  async listMatches(req: express.Request, res: express.Response) {
    const matches = await MatchesService.list()
    res.status(200).send(matches)
  }

  async getMatchById(req: express.Request, res: express.Response) {
    const team = await MatchesService.readById(req.body.id)
    res.status(200).send(team)
  }

  async createMatches(req: express.Request, res: express.Response) {
    await MatchesService.create()
    res.status(204).send()
  }

  async patch(req: express.Request, res: express.Response) {
    log(await MatchesService.patchById(req.body.id, req.body))
    res.status(204).send()
  }

  async put(req: express.Request, res: express.Response) {
    log(await MatchesService.putById(req.body.id, req.body))
    res.status(204).send()
  }

  async removeMatch(req: express.Request, res: express.Response) {
    log(await MatchesService.deleteById(req.body.id))
    res.status(204).send()
  }
}

export default new MatchesController()
