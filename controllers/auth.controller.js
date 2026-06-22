import { JwtService } from '../services/jwt.service.js';

const SIMULATED_USERS = {
    admin: { password: 'admin123', id: 'usr-001', name: 'Administrador del Sistema' },
    david: { password: 'david123', id: 'usr-002', name: 'David Cepeda' },
};

export class AuthController {
    static generateToken(req, res) {
        const { username, password } = req.body ?? {};

        if (!username || !password) {
            return res.status(400).json({ error: 'username y password son requeridos' });
        }

        const user = SIMULATED_USERS[username];

        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const token = JwtService.signToken({ id: user.id, name: user.name });

        res.status(200).json({ access_token: token, token_type: 'Bearer', expires_in: 60 });
    }
}
