import { Request, Response } from 'express';
import * as HttpStatus from 'http-status';
import * as _ from 'lodash';
import ResponseHandlers from '../../api/handlers/response-handlers';
import CartaoService from './service';

class CartaoController {

    getAll(req: Request, res: Response) {
        CartaoService
            .getAll()
            .then(_.partial(ResponseHandlers.onSuccess, res, HttpStatus.OK))
            .catch(_.partial(ResponseHandlers.onError, res, HttpStatus.INTERNAL_SERVER_ERROR, 'Erro ao buscar todos os cartões'))
    }

    createCartao(req: Request, res: Response) {
        CartaoService.create(req.body)
            .then(_.partial(ResponseHandlers.onSuccess, res, HttpStatus.CREATED))
            .catch(_.partial(ResponseHandlers.dbErrorHandler, res, HttpStatus.INTERNAL_SERVER_ERROR))
            .catch(_.partial(ResponseHandlers.onError, res, HttpStatus.INTERNAL_SERVER_ERROR, 'Erro ao inserir novo cartão'));
    }

    getById(req: Request, res: Response) {
        const cartaoId = parseInt(req.params.id);

        CartaoService.getById(cartaoId)
            .then(_.partial(ResponseHandlers.onSuccess, res, HttpStatus.OK))
            .catch(_.partial(ResponseHandlers.onError, res, HttpStatus.INTERNAL_SERVER_ERROR, 'Cartão não encontrado'));

    }

    updateCartao(req: Request, res: Response) {
        const cartaoId = parseInt(req.params.id);
        const props = req.body;

        CartaoService.update(cartaoId, props)
            .then(_.partial(ResponseHandlers.onSuccess, res, HttpStatus.OK))
            .catch(_.partial(ResponseHandlers.onError, res, HttpStatus.INTERNAL_SERVER_ERROR, 'Falha ao atualizar cartão'));
    }

    deleteCartao(req: Request, res: Response) {
        const cartaoId = parseInt(req.params.id);

        CartaoService.delete(cartaoId)
            .then(_.partial(ResponseHandlers.onSuccess, res, HttpStatus.OK))
            .catch(_.partial(ResponseHandlers.onError, res, HttpStatus.INTERNAL_SERVER_ERROR, 'Erro ao excluir cartão'));
    }
}

export default new CartaoController();