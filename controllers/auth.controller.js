import { JwtService } from '../services/jwt.service.js';

export class AuthController {
    /**
     * Simula un servidor de autenticación que genera un token.
     */
    static async generateToken(req, res) {
        // TODO: Implementar generación de token.
        // 1. Obtener credenciales (username/password) del req.body.
        // 2. Validar credenciales de forma simulada (ej. if user === 'admin'...).
        // 3. Si son válidas, crear un payload y llamar a JwtService.signToken(payload).
        // 4. Responder con el token generado.
        // 5. Si son inválidas, responder con status 401.
    }
}
