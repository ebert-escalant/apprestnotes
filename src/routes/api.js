import { Router } from 'express'
import { AuthController } from '../controllers/auth.js'
import { NoteController } from '../controllers/note.js'
import { authMiddleware } from '../middlewares/auth.js'

export const apiRouter = Router()

apiRouter.post('/auth/login', AuthController.login)
apiRouter.post('/auth/register', AuthController.register)

apiRouter.get('/notes', authMiddleware, NoteController.getAll)
apiRouter.get('/notes/:id', authMiddleware, NoteController.getOne)
apiRouter.post('/notes', authMiddleware, NoteController.create)
apiRouter.put('/notes/:id', authMiddleware, NoteController.update)
apiRouter.delete('/notes/:id', authMiddleware, NoteController.delete)
apiRouter.patch('/notes/:id/favorite', authMiddleware, NoteController.favorite)