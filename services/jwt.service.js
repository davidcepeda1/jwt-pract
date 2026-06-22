import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export class JwtService {
    /**
     * Firma un token JWT con RS256 a partir de los datos del usuario.
     * @param {{ id: string|number, name: string }} user
     * @returns {string} Token JWT firmado.
     */
    static signToken(user) {
        const now = Math.floor(Date.now() / 1000);

        const payload = {
            sub: user.id,
            name: user.name,
            exp: now + 60,
        };

        return jwt.sign(payload, config.PRIVATE_KEY, { algorithm: 'RS256' });
    }

    /**
     * Verifica la firma de un token JWT usando únicamente la llave pública.
     * @param {string} token
     * @returns {object} Payload decodificado.
     * @throws {Error} Si el token es inválido o ha expirado.
     */
    static verifyToken(token) {
        return jwt.verify(token, config.PUBLIC_KEY, { algorithms: ['RS256'] });
    }
}
