import { Categoria } from "./Categoria";
import { Produto } from "./Produto";

export class CategoriaService {
    private categorias: Categoria[] = [];
    private nextId = 1;

    criarCategoria(nome: string, descricao: string): Categoria {
        const novaCategoria: Categoria = {
            id: this.nextId++,
            nome,
            descricao,
            dataCriacao: new Date(),
        };
        this.categorias.push(novaCategoria);
        return novaCategoria;
    }

    listarCategorias(): Categoria[] {
        return this.categorias;
    }

    buscarCategoria(idOuNome: number | string): Categoria | undefined {
        return this.categorias.find(cat => cat.id === idOuNome || cat.nome === idOuNome);
    }

    atualizarCategoria(id: number, nome?: string, descricao?: string): boolean {
        const categoria = this.categorias.find(cat => cat.id === id);
        if (categoria) {
            if (nome) categoria.nome = nome;
            if (descricao) categoria.descricao = descricao;
            return true;
        }
        return false;
    }

    removerCategoria(id: number, produtos: Produto[]): boolean {
        if (produtos.some(prod => prod.categoriaId === id)) {
            console.log("Não é possível remover a categoria, pois há produtos associados.");
            return false;
        }
        const index = this.categorias.findIndex(cat => cat.id === id);
        if (index !== -1) {
            this.categorias.splice(index, 1);
            return true;
        }
        return false;
    }
}