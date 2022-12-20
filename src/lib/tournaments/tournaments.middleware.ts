import express from 'express'
import TournamentsService from './tournaments.service'

class TournamentsMiddleware {
  async validateTournamentExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await TournamentsService.readById(req.params.tournamentId)
    if (user) {
      next()
    } else {
      res.status(404).send({
        error: `Tournament ${req.params.tournamentId} not found`,
      })
    }
  }

  async extractTournamentId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.tournamentId
    next()
  }
}

export default new TournamentsMiddleware()
