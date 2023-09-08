import { AppHelper } from '../helpers/app.js'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export class AuthController {
	static async login (req, res) {
		try {
			const { email, password } = req.body

			if (!email || !password) {
				return res.status(400).send({ message: 'Email and password are required' })
			}

			const user = await prisma.user.findUnique({
				where: {
					email,
					status: 'active'
				}
			})

			const isPasswordValid = user === null
				? false
				: await bcrypt.compare(password, user.password)

			if (!isPasswordValid) {
				return res.status(400).send({ message: 'Invalid email or password' })
			}

			return res.send({
				token: {
					accessToken: AppHelper.getJwtToken(user),
					expiresIn: 60 * 60 * 2
				},
				user: {
					id: user.id,
					email: user.email,
					name: user.name
				}
			})
		} catch (error) {
			console.log(error)
			return res.status(500).send({ message: 'Internal Server Error' })
		}
	}

	static async register (req, res) {
		try {
			const { email, name, password } = req.body

			if (!email || !password || !name) {
				return res.status(400).send({ message: 'Email, name and password are required' })
			}

			const user = await prisma.user.findUnique({
				where: { email }
			})

			if (user) {
				return res.status(400).send({ message: 'User already exists' })
			}

			const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10))

			await prisma.user.create({
				data: {
					email,
					name,
					password: hashedPassword
				}
			})

			return res.status(201).send({ message: 'User created' })
		} catch (error) {
			console.log(error)
			return res.status(500).send({ message: 'Internal Server Error' })
		}
	}
}