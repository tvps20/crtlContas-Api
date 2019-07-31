import { Response } from 'express';
import * as HTTPStatus from 'http-status'

export function onSuccess(res: Response, status: any, data: any){
    res.status(status).json({ payload: data })
}