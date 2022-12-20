import { App } from './application'
import { MatchesRoutes } from './lib/matches'
import { TeamsRoutes } from './lib/teams'
import { TournamentsRoutes } from './lib/tournaments'
import { UsersRoutes } from './lib/users'
import { middleware } from './middleware'

const port: number = 3001
const routes = [
  new UsersRoutes(),
  new TeamsRoutes(),
  new TournamentsRoutes(),
  new MatchesRoutes(),
]

const app = new App(port, middleware, routes)

app.listen(routes)
