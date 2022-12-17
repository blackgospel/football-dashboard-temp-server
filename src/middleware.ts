import bodyParser from 'body-parser'
import { NextFunction, Request, Response } from 'express'
import * as expressWinston from 'express-winston'
import * as winston from 'winston'

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
}

export const middleware = [
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  function (req: Request, res: Response, next: NextFunction) {
    res.set('Cache-Control', 'no-store, max-age=0')
    next()
  },
  function (req: Request, res: Response, next: NextFunction) {
    res.header('Access-Control-Allow-Origin')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  },
  expressWinston.logger(loggerOptions),
]
