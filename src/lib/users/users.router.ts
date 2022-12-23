import express from 'express'
import { body } from 'express-validator'
import { CommonRoutesConfig } from '../common/common.routes'
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware'
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
        body('email').isEmail(),
        body('password')
          .isLength({ min: 5 })
          .withMessage('Must include password (5+ characters)'),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
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
      body('email').isEmail(),
      body('password')
        .isLength({ min: 5 })
        .withMessage('Must include password (5+ characters)'),
      body('firstName').isString(),
      body('lastName').isString(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      UsersMiddleware.validateSameEmailBelongToSameUser,
      UsersController.put,
    ])

    this.router.patch(`/users/:userId`, [
      body('email').isEmail().optional(),
      body('password')
        .isLength({ min: 5 })
        .withMessage('Password must be 5+ characters')
        .optional(),
      body('firstName').isString().optional(),
      body('lastName').isString().optional(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      UsersMiddleware.validatePatchEmail,
      UsersController.patch,
    ])

    this.router
      .route(`/users/:userId/notes`)
      .post(
        body('matchId').isString(),
        body('content').isString(),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        UsersMiddleware.validatePatchEmail,
        UsersController.editNote
      )

    return this.router
  }
}
