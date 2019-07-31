import * as HTTPStatus from 'http-status';
import * as _ from 'lodash';
import {  Request, Response } from 'express';
import { onError } from '../../api/responses/errorHandler';
import { onSuccess } from '../../api/responses/successHandler';
import { dbErrorHandler } from '../../config/dbErrorHandler';
import UserService from './service';

class UserController {

    private userService: UserService;

    constructor(){
        this.userService = new UserService();
    }

    getAll(req: Request, res: Response) {
        this.userService.getAll()
        .then(_.partial(onSuccess, res, HTTPStatus.OK))
        .catch(_.partial(onError, res, HTTPStatus.INTERNAL_SERVER_ERROR, 'Erro ao buscar todos os usuários'));
    }

    createUser(req: Request, res: Response) {
        this.userService.create(req.body)
        .then(_.partial(onSuccess, res, HTTPStatus.CREATED))
        .catch(_.partial(dbErrorHandler, res, HTTPStatus.INTERNAL_SERVER_ERROR))
        .catch(_.partial(onError, res, HTTPStatus.INTERNAL_SERVER_ERROR, 'Erro ao inserir novo usuário'));
    }

    getById(req: Request, res: Response) {
        const userId = parseInt(req.params.id);

        this.userService.getById(userId)
        .then(_.partial(onSuccess, res, HTTPStatus.OK))
        .catch(_.partial(onError, res, HTTPStatus.INTERNAL_SERVER_ERROR, 'Usuário não encontrado'));
    }

    updateUser(req: Request, res: Response) {
        const userId = parseInt(req.params.id);
        const props = req.body;

        this.userService.update(userId, props)
        .then(_.partial(onSuccess, res, HTTPStatus.OK))
        .catch(_.partial(onError, res, HTTPStatus.INTERNAL_SERVER_ERROR, 'Falha ao atualizar usuário'));
    }

    deleteUser(req: Request, res: Response) {
        const userId = parseInt(req.params.id);

        this.userService.delete(userId)
        .then(_.partial(onSuccess, res, HTTPStatus.OK))
        .catch(_.partial(onError, res, HTTPStatus.INTERNAL_SERVER_ERROR, 'Erro ao excluir usuário'));
    }
}

export default UserController;