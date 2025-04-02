import * as readlineSync from "readline-sync";
import { CategoriaService } from "../categoria_produto/CategoriaService";
import { Produto } from "../categoria_produto/Produto";

const categoriaService = new CategoriaService();
const produtos: Produto[] = []; // Lista de produtos para validação ao remover categoria

export function menuCategorias() {
    while (true) {
        console.log("\nGerenciamento de Categorias");
        console.log("1 - Criar Categoria");
        console.log("2 - Listar Categorias");
        console.log("3 - Buscar Categoria");
        console.log("4 - Atualizar Categoria");
        console.log("5 - Remover Categoria");
        console.log("6 - Sair");
        
        const opcao = readlineSync.question("Escolha uma opcao: ");

        switch (opcao) {
            case "1":
                const nome = readlineSync.question("Nome da categoria: ");
                const descricao = readlineSync.question("Descricao da categoria: ");
                categoriaService.criarCategoria(nome, descricao);
                console.log("Categoria criada com sucesso!");
                break;

            case "2":
                console.log("\nLista de Categorias:", categoriaService.listarCategorias());
                break;

            case "3":
                const termo = readlineSync.question("Digite o ID ou Nome da categoria: ");
                const categoria = isNaN(Number(termo))
                    ? categoriaService.buscarCategoria(termo)
                    : categoriaService.buscarCategoria(Number(termo));
                console.log(categoria ? categoria : "Categoria nao encontrada");
                break;

            case "4":
                const idAtualizar = Number(readlineSync.question("ID da categoria a atualizar: "));
                const novoNome = readlineSync.question("Novo nome (deixe vazio para manter): ");
                const novaDescricao = readlineSync.question("Nova descricao (deixe vazio para manter): ");
                const atualizado = categoriaService.atualizarCategoria(idAtualizar, novoNome || undefined, novaDescricao || undefined);
                console.log(atualizado ? "Categoria atualizada com sucesso!" : "Categoria nao encontrada");
                break;

            case "5":
                const idRemover = Number(readlineSync.question("ID da categoria a remover: "));
                const removido = categoriaService.removerCategoria(idRemover, produtos);
                console.log(removido ? "Categoria removida com sucesso!" : "Nao foi possivel remover a categoria.");
                break;

            case "6":
                return;

            default:
                console.log("Opcao invalida. Tente novamente.");
        }
    }
}