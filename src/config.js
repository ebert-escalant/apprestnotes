import dotenv from 'dotenv'

dotenv.config()

export const port = process.env.PORT || 8000
export const host = process.env.HOST || 'http://127.0.0.1'
export const db = {
	url: process.env.DATABASE_URL || ''
}
export const jwt = {
	secret: process.env.JWT_SECRET || 'secret',
	expiresIn: process.env.JWT_EXPIRES_IN || '1d'
}

export const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : []