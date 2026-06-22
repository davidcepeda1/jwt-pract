import * as Sentry from '@sentry/node';
import jwt from 'jsonwebtoken';
import { JwtService } from '../services/jwt.service.js';

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader?.startsWith('Bearer ')) {
        // Error lógico: ausencia de credencial — decisión del cliente, no un crash
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    const token = authHeader.slice(7);

    try {
        req.user = JwtService.verifyToken(token);
        next();
    } catch (err) {
        // Errores lógicos de JWT: comportamiento esperado, no se reportan a Sentry
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: 'Token expirado' });
        }

        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(403).json({ error: 'Token inválido' });
        }

        // Error operacional inesperado: sí se reporta a Sentry
        Sentry.captureException(err);
        return res.status(500).json({ error: 'Error interno de autenticación' });
    }
};
