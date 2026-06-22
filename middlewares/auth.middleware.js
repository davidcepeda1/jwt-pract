import jwt from 'jsonwebtoken';
import { JwtService } from '../services/jwt.service.js';

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    const token = authHeader.slice(7);

    try {
        req.user = JwtService.verifyToken(token);
        next();
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: 'Token expirado' });
        }

        if (err instanceof jwt.JsonWebTokenError) {
            // Cubre: firma inválida, algoritmo no permitido, token malformado
            return res.status(401).json({ error: 'Token inválido' });
        }

        // Error inesperado — no exponer detalles internos
        return res.status(500).json({ error: 'Error interno de autenticación' });
    }
};
