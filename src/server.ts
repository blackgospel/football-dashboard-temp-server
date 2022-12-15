import { App } from './application'
import { UsersRoutes } from './lib/users'
import { middleware } from './middleware'

const port: number = 3001
const routes = [new UsersRoutes()]

const app = new App(port, middleware, routes)

app.listen(routes)
