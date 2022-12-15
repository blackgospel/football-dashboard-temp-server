import debug from 'debug'
import express, { Application } from 'express'
import { CommonRoutesConfig } from './lib/common/common.routes'

const debugLog: debug.IDebugger = debug('app')

export class App {
  public app: Application

  /**
   * @param port Port Application listens on
   * @param middleware Array of middleware to be applied to app
   * @param routes Array of express.Router objects for application routes
   * @param apiPath Base path for this api that will be prepended to all routes
   */
  constructor(
    private port: number,
    middleware: Array<any>,
    routes: Array<CommonRoutesConfig>,
    private apiPath: string = '/api'
  ) {
    this.app = express()

    this.middleware(middleware)

    this.routes(routes)
  }

  private middleware(mware: any[]) {
    mware.forEach(m => {
      this.app.use(m)
    })
  }

  public addMiddleWare(middleWare: any) {
    this.app.use(middleWare)
  }

  private routes(routes: Array<CommonRoutesConfig>) {
    routes.forEach(route => {
      this.app.use(`${this.apiPath}`, route.configureRoutes())
    })
  }

  public listen(routes: Array<CommonRoutesConfig>) {
    this.app.listen(this.port, () => {
      routes.forEach((route: CommonRoutesConfig) => {
        debugLog(`Routes configured for ${route.getName()}`)
      })
      console.log('APP LISTENING ON PORT:', this.port)
    })
  }
}
