import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
    user?: {
        permissions?: string[];
    };
}

function requirePermissions(requiredPermissions: string[]) {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        const userPermissions =  req.body.authorization.permissions || [];
        
        // Check if the user has the required permissions
        const hasPermission = requiredPermissions.every(permission => userPermissions.includes(permission));
        if (!hasPermission) {
            return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
        }

        next();
    };
}

export { requirePermissions };
