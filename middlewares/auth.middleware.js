import { JwtService } from '../services/jwt.service.js';

export const authMiddleware = (req, res, next) => {
    // TODO: Implementar middleware de autenticación.
    // 1. Extraer el token del header 'Authorization' (formato: Bearer <token>).
    // 2. Si no hay token, responder con status 401.
    // 3. Llamar a JwtService.verifyToken(token).
    // 4. Si el token es válido, adjuntar el payload a req.user y llamar a next().
    // 5. Si el token es inválido, responder con status 403.
};
