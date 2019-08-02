import * as HTTPStatus from 'http-status';
import * as _ from 'lodash';
import {  Request, Response } from 'express';
import Handlers from '../../api/responses/handlers';
import UserService from './service';

class UserController {

    constructor(){}

    getAll(req: Request, res: Response) {
        UserService.getAll()
        .then(_.partial(Handlers.onSuccess, res, HTTPStatus.OK))
        .catch(_.partial(Handlers.onError, res, HTTPStatus.INTERNAL_SERVER_ERROR, 'Erro ao buscar todos os usuários'));
    }

    createUser(req: Request, res: Response) {
        UserService.create(req.body)
        .then(_.partial(Handlers.onSuccess, res, HTTPStatus.CREATED))
        .catch(_.partial(Handlers.dbErrorHandler, res, HTTPStatus.INTERNAL_SERVER_ERROR))
        .catch(_.partial(Handlers.onError, res, HTTPStatus.INTERNAL_SERVER_ERROR, 'Erro ao inserir novo usuário'));
    }

    getById(req: Request, res: Response) {
        const userId = parseInt(req.params.id);

        UserService.getById(userId)
        .then(_.partial(Handlers.onSuccess, res, HTTPStatus.OK))
        .catch(_.partial(Handlers.onError, res, HTTPStatus.INTERNAL_SERVER_ERROR, 'Usuário não encontrado'));
    }

    updateUser(req: Request, res: Response) {
        const userId = parseInt(req.params.id);
        const props = req.body;

        UserService.update(userId, props)
        .then(_.partial(Handlers.onSuccess, res, HTTPStatus.OK))
        .catch(_.partial(Handlers.onError, res, HTTPStatus.INTERNAL_SERVER_ERROR, 'Falha ao atualizar usuário'));
    }

    deleteUser(req: Request, res: Response) {
        const userId = parseInt(req.params.id);

        UserService.delete(userId)
        .then(_.partial(Handlers.onSuccess, res, HTTPStatus.OK))
        .catch(_.partial(Handlers.onError, res, HTTPStatus.INTERNAL_SERVER_ERROR, 'Erro ao excluir usuário'));
    }
}

export default new UserController();