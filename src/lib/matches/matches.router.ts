import express from 'express'
import { CommonRoutesConfig } from '../common/common.routes'
import MatchesController from './matches.controller'
import MatchesMiddleware from './matches.middleware'

export class MatchesRoutes extends CommonRoutesConfig {
  constructor() {
    super(express.Router(), 'MatchesRoutes')
  }

  configureRoutes(): express.Router {
    this.router
      .route(`/matches`)
      .get(MatchesController.listMatches)
      .post(MatchesController.createMatches)

    this.router.route(`/matches/today`).get(MatchesController.listMatches)

    this.router.param(`matchId`, MatchesMiddleware.extractMatchId)
    this.router
      .route(`/matches/:matchId`)
      .all(MatchesMiddleware.validateMatchExists)
      .get(MatchesController.getMatchById)

    return this.router
  }
}
