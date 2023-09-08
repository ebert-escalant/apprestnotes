import { Router } from 'express'

export const webRouter = Router()

webRouter.get('/', (_req, res) => {
	res.send('Hello World')
})