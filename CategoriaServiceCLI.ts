import * as readlineSync from "readline-sync";
import { CategoriaService } from "./CategoriaService";
import { Produto } from "./Produto";

export class CategoriaServiceCLI {
    private categoriaService: CategoriaService;
    private produtos: Produto[];

    constructor() {
        this.categoriaService = new CategoriaService();
        this.produtos = [];
    }

    iniciar(): void {
        console.log("\n--- Sistema de Gestão de Categorias ---");
        console.log("Bem-vindo ao sistema de gerenciamento de categorias!");
        this.menuCategorias();
    }


    menuCategorias(): void {
        while (true) {
            console.log("\nGerenciamento de Categorias");
            console.log("1 - Criar Categoria");
            console.log("2 - Listar Categorias");
            console.log("3 - Buscar Categoria");
            console.log("4 - Atualizar Categoria");
            console.log("5 - Remover Categoria");
            console.log("0 - Voltar");

            const opcao = readlineSync.question("Escolha uma opcao: ");

            switch (opcao) {
                case "1":
                    this.criarCategoria();
                    break;
                case "2":
                    this.listarCategorias();
                    break;
                case "3":
                    this.buscarCategoria();
                    break;
                case "4":
                    this.atualizarCategoria();
                    break;
                case "5":
                    this.removerCategoria();
                    break;
                case "0":
                    return;
                default:
                    console.log("Opcao invalida. Tente novamente.");
            }
        }
    }

    private criarCategoria(): void {
        const nome = readlineSync.question("Nome da categoria: ");
        const descricao = readlineSync.question("Descricao da categoria: ");
        this.categoriaService.criarCategoria(nome, descricao);
        console.log("Categoria criada com sucesso!");
    }

    private listarCategorias(): void {
        console.log("\nLista de Categorias:", this.categoriaService.listarCategorias());
    }

    private buscarCategoria(): void {
        const termo = readlineSync.question("Digite o ID ou Nome da categoria: ");
        const categoria = isNaN(Number(termo))
            ? this.categoriaService.buscarCategoria(termo)
            : this.categoriaService.buscarCategoria(Number(termo));
        console.log(categoria ? categoria : "Categoria nao encontrada");
    }

    private atualizarCategoria(): void {
        const id = Number(readlineSync.question("ID da categoria a atualizar: "));
        const nome = readlineSync.question("Novo nome (deixe vazio para manter): ");
        const descricao = readlineSync.question("Nova descricao (deixe vazio para manter): ");
        const atualizado = this.categoriaService.atualizarCategoria(id, nome || undefined, descricao || undefined);
        console.log(atualizado ? "Categoria atualizada com sucesso!" : "Categoria nao encontrada");
    }

    private removerCategoria(): void {
        const id = Number(readlineSync.question("ID da categoria a remover: "));
        const removido = this.categoriaService.removerCategoria(id, this.produtos);
        console.log(removido ? "Categoria removida com sucesso!" : "Nao foi possivel remover a categoria.");
    }
}
