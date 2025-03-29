import { Produto } from './Produto';

export class ProdutoService {
    private produtos: Produto[] = [];

    criarProduto(produto: Produto): void {
        this.produtos.push(produto);
    }

    listarProdutos(): Produto[] {
        return this.produtos;
    }

    buscarProduto(criterio: string | number): Produto | undefined {
        if (typeof criterio === 'number') {
            return this.produtos.find(p => p.categoriaId === criterio);
        }
        return this.produtos.find(p => p.nome.toLowerCase() === criterio.toLowerCase());
    }

    atualizarProduto(id: number, dados: Partial<Omit<Produto, 'id' | 'dataCriacao'>>): boolean {
        const produto = this.produtos.find(p => p.categoriaId === id);
        if (produto) {
            Object.assign(produto, dados, { dataAtualizacao: new Date() });
            return true;
        }
        return false;
    }

    removerProduto(id: number): boolean {
        const index = this.produtos.findIndex(p => p.categoriaId === id);
        if (index !== -1) {
            this.produtos.splice(index, 1);
            return true;
        }
        return false;
    }
}
