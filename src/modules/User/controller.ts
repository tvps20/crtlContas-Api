import * as HttpStatus from 'http-status';
import * as _ from 'lodash';
import { Request, Response } from 'express';
import ResponseHandlers from '../../api/handlers/response-handlers';
import UserService from './service';

class UserController {

    getAll(req: Request, res: Response) {
        UserService.getAll()
            .then(_.partial(ResponseHandlers.onSuccess, res, HttpStatus.OK))
            .catch(_.partial(ResponseHandlers.onError, res, HttpStatus.INTERNAL_SERVER_ERROR, 'Erro ao buscar todos os usuários'));
    }

    createUser(req: Request, res: Response) {
        UserService.create(req.body)
            .then(_.partial(ResponseHandlers.onSuccess, res, HttpStatus.CREATED))
            .catch(_.partial(ResponseHandlers.dbErrorHandler, res, HttpStatus.INTERNAL_SERVER_ERROR))
            .catch(_.partial(ResponseHandlers.onError, res, HttpStatus.INTERNAL_SERVER_ERROR, 'Erro ao inserir novo usuário'));
    }

    getById(req: Request, res: Response) {
        const userId = parseInt(req.params.id);

        UserService.getById(userId)
            .then(_.partial(ResponseHandlers.onSuccess, res, HttpStatus.OK))
            .catch(_.partial(ResponseHandlers.onError, res, HttpStatus.INTERNAL_SERVER_ERROR, 'Usuário não encontrado'));
    }

    updateUser(req: Request, res: Response) {
        const userId = parseInt(req.params.id);
        const props = req.body;

        UserService.update(userId, props)
            .then(_.partial(ResponseHandlers.onSuccess, res, HttpStatus.OK))
            .catch(_.partial(ResponseHandlers.onError, res, HttpStatus.INTERNAL_SERVER_ERROR, 'Falha ao atualizar usuário'));
    }

    deleteUser(req: Request, res: Response) {
        const userId = parseInt(req.params.id);

        UserService.delete(userId)
            .then(_.partial(ResponseHandlers.onSuccess, res, HttpStatus.OK))
            .catch(_.partial(ResponseHandlers.onError, res, HttpStatus.INTERNAL_SERVER_ERROR, 'Erro ao excluir usuário'));
    }
}

export default new UserController();