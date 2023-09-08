import cors from 'cors'
import { allowedOrigins } from '../config.js'

export const corsMiddleware = () => cors({
	origin: (origin, callback) => {
		if (origin === undefined || allowedOrigins.includes(origin)) {
			return callback(null, true)
		}

		return callback(new Error('Not allowed by CORS'))
	}
})