import debug from 'debug'
import express from 'express'
import tournamentsService from './tournaments.service'

const log: debug.IDebugger = debug('app:tournaments-controller')

class TournamentsController {
  async listTournaments(req: express.Request, res: express.Response) {
    const tournaments = await tournamentsService.list()
    res.status(200).send(tournaments)
  }

  async getTournamentById(req: express.Request, res: express.Response) {
    const tournament = await tournamentsService.readById(req.body.id)
    res.status(200).send(tournament)
  }

  async createTournament(req: express.Request, res: express.Response) {
    const tournamentId = await tournamentsService.create(req.body)
    res.status(201).send({ id: tournamentId })
  }

  async patch(req: express.Request, res: express.Response) {
    log(await tournamentsService.patchById(req.body.id, req.body))
    res.status(204).send()
  }

  async put(req: express.Request, res: express.Response) {
    log(await tournamentsService.putById(req.body.id, req.body))
    res.status(204).send()
  }

  async removeTournament(req: express.Request, res: express.Response) {
    log(await tournamentsService.deleteById(req.body.id))
    res.status(204).send()
  }
}

export default new TournamentsController()
