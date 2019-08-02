import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import * as HttpStatus from 'http-status';
import * as jwt from 'jwt-simple';
import * as bcrypt from 'bcrypt';
const config = require('../../config/env/config')();

class Handlers {

    authFail(req: Request, res: Response){
        res.sendStatus(HttpStatus.UNAUTHORIZED);
    }

    authSuccess(res: Response, credential: any, data: any){
        const isMatch = bcrypt.compareSync(credential.password, data.password);
    
        if(isMatch){
            const payload = {id: data.id};
    
            res.json({
                token: jwt.encode(payload, config.secret)
            });
        } else {
            res.sendStatus(HttpStatus.UNAUTHORIZED);
        }
    }

    onError(res: Response, status: any, message: string, err: any){
        console.log(`Error: ${err}`);
        res.status(status).send(message);
    }

    onSuccess(res: Response, status: any, data: any){
        res.status(status).json({ payload: data })
    }

    errorHandlerApi(err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction){
        console.log(`Api error handler foi executada: ${err}`);
        res.status(500).json({
            errorCode: 'ERR-001',
            message: 'Error Interno do Servidor'
        });
    }

    dbErrorHandler(res: Response, status: any, err: any){
        console.log(`Error db: ${err}`);
        res.status(status).json({
            code: 'ERRO-01',
            message: 'Erro ao criar entidade'
        })
    }
}

export default new Handlers();