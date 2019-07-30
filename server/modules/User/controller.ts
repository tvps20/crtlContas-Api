import {  Request, Response } from 'express';

class UserController {
    constructor(){}

    getAll(req: Request, res: Response) {
        res.status(200).json({
            message: 'Ok'
        });
    }

    createUser(req: Request, res: Response) {
        res.status(200).json({
            message: 'Ok'
        });
    }

    getById(req: Request, res: Response) {
        res.status(200).json({
            message: 'Ok'
        });
    }

    updateUser(req: Request, res: Response) {
        res.status(200).json({
            message: 'Ok'
        });
    }

    deleteUser(req: Request, res: Response) {
        res.status(200).json({
            message: 'Ok'
        });
    }
}

export default UserController;