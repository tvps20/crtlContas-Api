import { Request, Response } from 'express';
import FaturaController from './controller';

class FaturaRouter {

    constructor() { }

    index(req: Request, res: Response) {
        return FaturaController.getAll(req, res);
    }

    create(req: Request, res: Response) {
        return FaturaController.createCartao(req, res);
    }

    findOnde(req: Request, res: Response) {
        return FaturaController.getById(req, res);
    }

    update(req: Request, res: Response) {
        return FaturaController.updateCartao(req, res);
    }

    delete(req: Request, res: Response) {
        return FaturaController.deleteCartao(req, res);
    }
}

export default new FaturaRouter();