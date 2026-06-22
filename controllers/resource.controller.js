import * as Sentry from '@sentry/node';

export class ResourceController {
    static getAlphaPrivateData(req, res) {
        try {
            // Simulación de lógica interna del microservicio
            const data = {
                service: 'service-alpha',
                message: 'Acceso concedido al recurso privado de Service Alpha',
                authenticatedUser: {
                    id: req.user.sub,
                    name: req.user.name,
                },
            };

            res.status(200).json(data);
        } catch (err) {
            // Fallo operacional interno: se reporta a Sentry para diagnóstico
            Sentry.captureException(err);
            res.status(500).json({ error: 'Error interno en Service Alpha' });
        }
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
