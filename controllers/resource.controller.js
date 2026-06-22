import * as Sentry from '@sentry/node';

export class ResourceController {
    static getAlphaPrivateData(req, res) {
        // Simulación de fallo operacional crítico — se propaga al handler global de Sentry
        throw new Error('Conexión perdida con la BDD');
    }

    static getBetaPrivateData(req, res) {
        const userId = req.user.sub;

        try {
            // Simulación de fallo operacional en Service Beta
            throw new Error('Timeout al consultar el servicio de inventario');
        } catch (err) {
            Sentry.withScope((scope) => {
                // Tags indexables: aparecen como filtros en el dashboard de Sentry
                scope.setTag('service', 'service-beta');
                scope.setTag('affected_user', userId);

                // Contexto extra: visible en el panel de detalle del evento
                scope.setExtra('transfer_payload', {
                    endpoint: 'GET /v1/service-beta/private',
                    timestamp: new Date().toISOString(),
                    // No se incluye: token, password, headers de autorización
                });

                scope.setLevel('error');
                Sentry.captureException(err);
            });

            return res.status(500).json({ error: 'Error interno en Service Beta' });
        }
    }
}
