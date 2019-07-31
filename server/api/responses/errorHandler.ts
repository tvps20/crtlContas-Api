import { Response } from 'express';
import * as HTTPStatus from 'http-status'

export function onError(res: Response, status: any, message: string, err: any){
    console.log(`Error: ${err}`);
    res.status(status).send(message);
}