import express from 'express'
import { CommonRoutesConfig } from '../common/common.routes'
import UsersController from './users.controller'
import UsersMiddleware from './users.middleware'

export class UsersRoutes extends CommonRoutesConfig {
  constructor() {
    super(express.Router(), 'UsersRoutes')
  }

  configureRoutes(): express.Router {
    this.router
      .route(`/users`)
      .get(UsersController.listUsers)
      .post(
        UsersMiddleware.validateRequiredUserBodyFields,
        UsersMiddleware.validateSameEmailDoesntExist,
        UsersController.createUser
      )

    this.router.param(`userId`, UsersMiddleware.extractUserId)
    this.router
      .route(`/users/:userId`)
      .all(UsersMiddleware.validateUserExists)
      .get(UsersController.getUserById)
      .delete(UsersController.removeUser)

    this.router.put(`/users/:userId`, [
      UsersMiddleware.validateRequiredUserBodyFields,
      UsersMiddleware.validateSameEmailBelongToSameUser,
      UsersController.put,
    ])

    this.router.patch(`/users/:userId`, [
      UsersMiddleware.validatePatchEmail,
      UsersController.patch,
    ])

    return this.router
  }
}
