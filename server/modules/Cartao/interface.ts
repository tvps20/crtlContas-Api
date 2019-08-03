import { IFatura } from "../Fatura/interface";

export interface ICartao {
    id: number;
    nome: string;
    bandeira: string;
    Faturas?: IFatura[];
}

export function createCartao({ id, nome, bandeira, Faturas }: any): ICartao {
    return {
        id, nome, bandeira, Faturas
    }
}

export function createCartoes(data: any[]): ICartao[] {
    return data.map(createCartao);
}