import express from 'express'
import MatchesService from './matches.service'

class MatchesMiddleware {
  async validateMatchExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await MatchesService.readById(req.params.matchId)
    if (user) {
      next()
    } else {
      res.status(404).send({
        error: `Match ${req.params.matchId} not found`,
      })
    }
  }

  async extractMatchId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.matchId
    next()
  }
}

export default new MatchesMiddleware()
