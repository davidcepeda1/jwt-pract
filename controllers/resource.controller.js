import * as Sentry from '@sentry/node';

export class ResourceController {
    static getAlphaPrivateData(req, res) {
        // Simulación de fallo operacional crítico — se propaga al handler global de Sentry
        throw new Error('Conexión perdida con la BDD');
    }

    static getBetaPrivateData(req, res) {
        res.status(200).json({
            service: 'service-beta',
            message: 'Acceso concedido al recurso privado de Service Beta',
            authenticatedUser: {
                id: req.user.sub,
                name: req.user.name,
            },
        });
    }
}
