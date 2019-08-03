import { Request, Response } from 'express';
import * as HttpStatus from 'http-status';
import * as _ from 'lodash';
import Handlers from '../../api/responses/handlers';
import FaturaService from './service';

class FaturaController {

    getAll(req: Request, res: Response) {
        FaturaService
            .getAll()
            .then(_.partial(Handlers.onSuccess, res, HttpStatus.OK))
            .catch(_.partial(Handlers.onError, res, HttpStatus.INTERNAL_SERVER_ERROR, 'Erro ao buscar todas as faturas'))
    }

    createCartao(req: Request, res: Response) {
        FaturaService.create(req.body)
            .then(_.partial(Handlers.onSuccess, res, HttpStatus.CREATED))
            .catch(_.partial(Handlers.dbErrorHandler, res, HttpStatus.INTERNAL_SERVER_ERROR))
            .catch(_.partial(Handlers.onError, res, HttpStatus.INTERNAL_SERVER_ERROR, 'Erro ao inserir nova fatura'));
    }

    getById(req: Request, res: Response) {
        const faturaId = parseInt(req.params.id);

        FaturaService.getById(faturaId)
            .then(_.partial(Handlers.onSuccess, res, HttpStatus.OK))
            .catch(_.partial(Handlers.onError, res, HttpStatus.INTERNAL_SERVER_ERROR, 'Fatura não encontrada'));

    }

    updateCartao(req: Request, res: Response) {
        const faturaId = parseInt(req.params.id);
        const props = req.body;

        FaturaService.update(faturaId, props)
            .then(_.partial(Handlers.onSuccess, res, HttpStatus.OK))
            .catch(_.partial(Handlers.onError, res, HttpStatus.INTERNAL_SERVER_ERROR, 'Falha ao atualizar fatura'));
    }

    deleteCartao(req: Request, res: Response) {
        const faturaId = parseInt(req.params.id);

        FaturaService.delete(faturaId)
            .then(_.partial(Handlers.onSuccess, res, HttpStatus.OK))
            .catch(_.partial(Handlers.onError, res, HttpStatus.INTERNAL_SERVER_ERROR, 'Erro ao excluir fatura'));
    }
}

export default new FaturaController();