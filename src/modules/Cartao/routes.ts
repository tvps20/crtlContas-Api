import { Request, Response } from 'express';
import CartaoController from './controller';

class CartaoRouter {

    constructor() { }

    index(req: Request, res: Response) {
        return CartaoController.getAll(req, res);
    }

    create(req: Request, res: Response) {
        return CartaoController.createCartao(req, res);
    }

    findOnde(req: Request, res: Response) {
        return CartaoController.getById(req, res);
    }

    update(req: Request, res: Response) {
        return CartaoController.updateCartao(req, res);
    }

    delete(req: Request, res: Response) {
        return CartaoController.deleteCartao(req, res);
    }
}

export default new CartaoRouter();