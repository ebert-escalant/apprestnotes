import jwt from 'jsonwebtoken'
import { jwt as jwtConfig } from '../config.js'

export class AppHelper {
	static getJwtToken (user) {
		return jwt.sign(
			{
				id: user.id,
				email: user.email
			},
			jwtConfig.secret,
			{
				expiresIn: jwtConfig.expiresIn
			}
		)
	}

	static getJwtPayload (token) {
		if (!token) {
			throw new Error('Invalid token')
		}

		const [type, value] = token.split(' ')

		if (type !== 'Bearer') {
			throw new Error('Invalid token')
		}

		return jwt.verify(value, jwtConfig.secret)
	}
}