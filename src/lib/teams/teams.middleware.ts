import express from 'express'
import TeamsService from './teams.service'

class TeamsMiddleware {
  async validateTeamExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await TeamsService.readById(req.params.teamId)
    if (user) {
      next()
    } else {
      res.status(404).send({
        error: `Team ${req.params.teamId} not found`,
      })
    }
  }

  async extractTeamId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.teamId
    next()
  }
}

export default new TeamsMiddleware()
