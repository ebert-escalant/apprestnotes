import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class NoteController {
	static async getAll (req, res) {
		try {
			const userId = req.payload.id
			const { search } = req.query

			if (!userId) {
				return res.status(401).send({ message: 'Unauthorized' })
			}

			const notes = await prisma.note.findMany({
				select: {
					id: true,
					title: true,
					description: true,
					language: true,
					code: true,
					favorite: true,
					createdAt: true
				},
				where: {
					AND: [
						{ userId },
						{
							OR: [
								{ title: { contains: search.toLowerCase() || '' } },
								{ description: { contains: search.toLowerCase() || '' } },
								{ language: { contains: search.toLowerCase() || '' } }
							]
						}
					]
				},
				orderBy: [
					{ favorite: 'desc' },
					{	createdAt: 'desc' }
				]
			})

			return res.send(notes)
		} catch (error) {
			console.log(error)
			return res.status(500).send({ message: 'Internal Server Error' })
		}
	}

	static async getOne (req, res) {
		try {
			const userId = req.payload.id
			const noteId = req.params.id

			if (!userId) {
				return res.status(401).send({ message: 'Unauthorized' })
			}

			const note = await prisma.note.findUnique({
				where: {
					id: noteId
				}
			})

			if (!note) {
				return res.status(404).send({ message: 'Note not found' })
			}

			if (note.userId !== userId) {
				return res.status(401).send({ message: 'Unauthorized' })
			}

			return res.send(note)
		} catch (error) {
			console.log(error)
			return res.status(500).send({ message: 'Internal Server Error' })
		}
	}

	static async create (req, res) {
		try {
			const userId = req.payload.id
			const { title, description, language, code } = req.body

			if (!userId) {
				return res.status(401).send({ message: 'Unauthorized' })
			}

			await prisma.note.create({
				data: {
					title,
					description,
					language,
					code,
					favorite: false,
					user: {
						connect: {
							id: userId
						}
					}
				}
			})

			return res.send({ message: 'Note created' })
		}	catch (error) {
			console.log(error)
			return res.status(500).send({ message: 'Internal Server Error' })
		}
	}

	static async update (req, res) {
		try {
			const userId = req.payload.id
			const noteId = req.params.id
			const { title, description, language, code, favorite } = req.body

			if (!userId) {
				return res.status(401).send({ message: 'Unauthorized' })
			}

			const note = await prisma.note.findUnique({
				where: {
					id: noteId
				}
			})

			if (!note) {
				return res.status(404).send({ message: 'Note not found' })
			}

			if (note.userId !== userId) {
				return res.status(401).send({ message: 'Unauthorized' })
			}

			await prisma.note.update({
				where: {
					id: noteId
				},
				data: {
					title,
					description,
					language,
					code,
					favorite
				}
			})

			return res.send({ message: 'Note updated' })
		} catch (error) {
			console.log(error)
			return res.status(500).send({ message: 'Internal Server Error' })
		}
	}

	static async delete (req, res) {
		try {
			const userId = req.payload.id
			const noteId = req.params.id

			if (!userId) {
				return res.status(401).send({ message: 'Unauthorized' })
			}

			const note = await prisma.note.findUnique({
				where: {
					id: noteId
				}
			})

			if (!note) {
				return res.status(404).send({ message: 'Note not found' })
			}

			if (note.userId !== userId) {
				return res.status(401).send({ message: 'Unauthorized' })
			}

			await prisma.note.delete({
				where: {
					id: noteId
				}
			})

			return res.send({ message: 'Note deleted' })
		} catch (error) {
			console.log(error)
			return res.status(500).send({ message: 'Internal Server Error' })
		}
	}

	static async favorite (req, res) {
		try {
			const userId = req.payload.id
			const noteId = req.params.id

			if (!userId) {
				return res.status(401).send({ message: 'Unauthorized' })
			}

			const note = await prisma.note.findUnique({
				where: {
					id: noteId
				}
			})

			if (!note) {
				return res.status(404).send({ message: 'Note not found' })
			}

			if (note.userId !== userId) {
				return res.status(401).send({ message: 'Unauthorized' })
			}

			await prisma.note.update({
				where: {
					id: noteId
				},
				data: {
					favorite: !note.favorite
				}
			})

			return res.send({ message: 'Note updated' })
		} catch (error) {
			console.log(error)
			return res.status(500).send({ message: 'Internal Server Error' })
		}
	}
}