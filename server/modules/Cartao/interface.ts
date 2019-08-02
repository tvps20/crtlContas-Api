export interface ICartao{
    id: number,
    nome: string,
    bandeira: string
} 

export function createCartao({id, nome, bandeira}: any): ICartao {
    return {
        id, nome, bandeira
    }
}

export function createCartoes(data: any[]): ICartao[] {
    return data.map(createCartao);
}