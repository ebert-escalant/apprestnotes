import express from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { webRouter } from './routes/web.js'
import { apiRouter } from './routes/api.js'
import { host, port } from './config.js'

export const createApp = () => {
	const app = express()

	app.use(express.json())
	app.use(express.urlencoded({ extended: true }))
	app.use(corsMiddleware())
	app.disable('x-powered-by')

	app.use('/', webRouter)
	app.use('/api', apiRouter)

	app.listen(port, () => {
		console.log(`Server listening at ${host}:${port}`)
	})
}