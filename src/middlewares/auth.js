import { AppHelper } from '../helpers/app.js'

export const authMiddleware = (req, _res, next) => {
	try {
		req.payload = AppHelper.getJwtPayload(req.headers.authorization)
		next()
	} catch (err) {
		return next(new Error('Authentication error'))
	}
}