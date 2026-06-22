import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export class JwtService {
    /**
     * Firma un token JWT basándose en el algoritmo configurado.
     * @param {Object} payload - Los datos del usuario a incluir en el token.
     * @returns {string} El token JWT generado.
     */
    static signToken(payload) {
        // TODO: Implementar lógica de firmado.
        // 1. Verificar si config.ALGORITHM es 'RS256' o 'HS256'.
        // 2. Si es 'RS256', usar config.PRIVATE_KEY.
        // 3. Si es 'HS256', usar config.JWT_SECRET.
        // 4. Establecer un tiempo de expiración (ej. 1h).
        // 5. Retornar el token firmado usando jwt.sign().
    }

    /**
     * Verifica un token JWT basándose en el algoritmo configurado.
     * @param {string} token - El token JWT a verificar.
     * @returns {Object|null} El payload decodificado o null si es inválido.
     */
    static verifyToken(token) {
        // TODO: Implementar lógica de verificación.
        // 1. Verificar si config.ALGORITHM es 'RS256' o 'HS256'.
        // 2. Si es 'RS256', usar config.PUBLIC_KEY para verificar.
        // 3. Si es 'HS256', usar config.JWT_SECRET para verificar.
        // 4. Retornar el payload decodificado usando jwt.verify().
        // 5. Manejar posibles errores (token expirado, firma inválida) y retornar null.
    }
}
