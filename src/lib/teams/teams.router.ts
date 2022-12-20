import express from 'express'
import { CommonRoutesConfig } from '../common/common.routes'
import TeamsController from './teams.controller'
import TeamsMiddleware from './teams.middleware'

export class TeamsRoutes extends CommonRoutesConfig {
  constructor() {
    super(express.Router(), 'TeamsRoutes')
  }

  configureRoutes(): express.Router {
    this.router.route(`/teams`).get(TeamsController.listTeams)

    this.router.param(`teamId`, TeamsMiddleware.extractTeamId)
    this.router
      .route(`/teams/:teamId`)
      .all(TeamsMiddleware.validateTeamExists)
      .get(TeamsController.getTeamById)

    return this.router
  }
}
