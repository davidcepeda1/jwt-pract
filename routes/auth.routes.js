import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';

const router = Router();

// TODO: Definir ruta POST /token que llame a AuthController.generateToken
router.post('/token', AuthController.generateToken);

export default router;
