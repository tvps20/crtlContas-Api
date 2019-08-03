import { ICartao } from "../Cartao/interface";

export interface IFatura {
    id: number;
    valor: number;
    observacao: string;
    cartaoId?: number;
    Cartao?: ICartao[]
}

export function createFatura({ id, valor, observacao, Cartao }: any): IFatura {
    return {
        id, valor, observacao, Cartao
    }
}

export function createFaturas(data: any[]): IFatura[] {
    return data.map(createFatura);
}