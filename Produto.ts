// src/Produto.ts
export interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;
    categoriaId: number;
    dataCriacao: Date;
    dataAtualizacao: Date;
}