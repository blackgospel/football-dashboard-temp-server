import express from 'express'
import { CommonRoutesConfig } from '../common/common.routes'
import TournamentsController from './tournaments.controller'
import TournamentsMiddleware from './tournaments.middleware'

export class TournamentsRoutes extends CommonRoutesConfig {
  constructor() {
    super(express.Router(), 'TournamentsRoutes')
  }

  configureRoutes(): express.Router {
    this.router.route(`/tournaments`).get(TournamentsController.listTournaments)

    this.router.param(`tournamentId`, TournamentsMiddleware.extractTournamentId)
    this.router
      .route(`/tournaments/:tournamentId`)
      .all(TournamentsMiddleware.validateTournamentExists)
      .get(TournamentsController.getTournamentById)

    return this.router
  }
}
