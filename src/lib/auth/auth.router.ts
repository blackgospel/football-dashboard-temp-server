import express from 'express'
import { body } from 'express-validator'
import { CommonRoutesConfig } from '../common/common.routes'
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware'
import AuthController from './auth.controller'
import AuthMiddleware from './auth.middleware'

export class AuthRoutes extends CommonRoutesConfig {
  constructor() {
    super(express.Router(), 'AuthRoutes')
  }

  configureRoutes(): express.Router {
    this.router.post(`/auth/login`, [
      body('email').isEmail(),
      body('password').isString(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      AuthMiddleware.verifyUserPassword,
      AuthController.createJWT,
    ])

    this.router.post(
      `/auth/check`,
      body('token').isString(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      AuthMiddleware.verifyRequestToken,
      AuthController.verifyJWT
    )

    return this.router
  }
}
