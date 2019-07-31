import { Response } from 'express';
import * as HTTPStatus from 'http-status'

export function dbErrorHandler(res: Response, status: any, err: any){
    console.log(`Error db: ${err}`);
    res.status(status).json({
        code: 'ERRO-01',
        message: 'Erro ao criar usuário'
    })
}