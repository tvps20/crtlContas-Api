import * as HTTPStatus from 'http-status';
import {  Request, Response } from 'express';
import UserService from './service';

class UserController {

    private userService: UserService;

    constructor(){
        this.userService = new UserService();
    }

    getAll(req: Request, res: Response) {
        this.userService.getAll().then(data => {
            res.status(HTTPStatus.OK).json({
                payload: data
            })
        })
        .catch( err => {
            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
                payload: 'Erro ao buscar todos os usuários'
            });
        });
    }

    createUser(req: Request, res: Response) {
        this.userService.create(req.body).then(data => {
            res.status(HTTPStatus.CREATED).json({
                payload: data
            });
        })
        .catch( err => {
            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
                payload: 'Erro ao criar um novo usuário'
            });
        });
    }

    getById(req: Request, res: Response) {
        const userId = parseInt(req.params.id);

        this.userService.getById(userId).then(data => {
            res.status(HTTPStatus.OK).json({ payload: data });
        })
        .catch(err => {
            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
                payload: 'Erro ao buscar usuário'
            });
        })
    }

    updateUser(req: Request, res: Response) {
        const userId = parseInt(req.params.id);
        const props = req.body;

        this.userService.update(userId, props).then(data => {
            res.status(HTTPStatus.OK).json({ payload: data });
        })
        .catch(err => {
            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
                payload: 'Erro ao atualizar usuário'
            });
        })
    }

    deleteUser(req: Request, res: Response) {
        const userId = parseInt(req.params.id);

        this.userService.delete(userId).then(data => {
            res.status(HTTPStatus.OK).json({ payload: data });
        })
        .catch(err => {
            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
                payload: 'Erro ao deletar usuário'
            });
        })
    }
}

export default UserController;