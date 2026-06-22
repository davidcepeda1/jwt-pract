export class ResourceController {
    static getAlphaPrivateData(req, res) {
        res.status(200).json({
            service: 'service-alpha',
            message: 'Acceso concedido al recurso privado de Service Alpha',
            authenticatedUser: {
                id: req.user.sub,
                name: req.user.name,
            },
        });
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
