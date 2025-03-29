import { AppDataSource } from "./data_source";
import { Produto } from "./Produto";
import { Categoria } from "./Categoria";

export class ProdutoService {
    private produtoRepository = AppDataSource.getRepository(Produto);
    private categoriaRepository = AppDataSource.getRepository(Categoria);

    async buscarCategoria(categoriaId: number): Promise<Categoria | null> {
        return await this.categoriaRepository.findOneBy({ id: categoriaId });
    }

    async listarCategorias(): Promise<Categoria[]> {
        // Lista todas as categorias disponíveis no banco de dados
        return await this.categoriaRepository.find();
    }

    async criarProduto(produto: Produto): Promise<Produto> {
        const novoProduto = this.produtoRepository.create(produto);
        return await this.produtoRepository.save(novoProduto);
    }

    async listarProdutos(): Promise<Produto[]> {
        return await this.produtoRepository.find();
    }

    async buscarProduto(id: number): Promise<Produto | null> {
        return await this.produtoRepository.findOneBy({ id });
    }

    async atualizarProduto(id: number, dadosAtualizados: Partial<Produto>): Promise<boolean> {
        const produto = await this.produtoRepository.findOneBy({ id });
        if (!produto) return false;

        Object.assign(produto, dadosAtualizados);
        await this.produtoRepository.save(produto);
        return true;
    }

    async removerProduto(id: number): Promise<boolean> {
        const produto = await this.produtoRepository.findOneBy({ id });
        if (!produto) return false;

        await this.produtoRepository.remove(produto);
        return true;
    }
}