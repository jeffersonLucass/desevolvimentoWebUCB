import { AppDataSource } from "./data_source";
import { Categoria } from "./Categoria";

export class CategoriaService {
    private categoriaRepository = AppDataSource.getRepository(Categoria);

    async criarCategoria(nome: string, descricao: string): Promise<Categoria> {
        const categoria = this.categoriaRepository.create({ nome, descricao });
        return await this.categoriaRepository.save(categoria);
    }

    async listarCategorias(): Promise<Categoria[]> {
        return await this.categoriaRepository.find();
    }

    async buscarCategoria(id: number): Promise<Categoria | null> {
        return await this.categoriaRepository.findOneBy({ id });
    }

    async atualizarCategoria(id: number, nome: string, descricao: string): Promise<boolean> {
        const categoria = await this.categoriaRepository.findOneBy({ id });
        if (!categoria) return false;

        categoria.nome = nome || categoria.nome;
        categoria.descricao = descricao || categoria.descricao;

        await this.categoriaRepository.save(categoria);
        return true;
    }

    async removerCategoria(id: number): Promise<boolean> {
        const categoria = await this.categoriaRepository.findOneBy({ id });
        if (!categoria) return false;

        await this.categoriaRepository.remove(categoria);
        return true;
    }
}