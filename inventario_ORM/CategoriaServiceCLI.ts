import * as readline from "readline";
import { CategoriaService } from "./CategoriaService";

export class CategoriaServiceCLI {
    private categoriaService = new CategoriaService();
    private rl: readline.Interface;

    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }

    async iniciar(): Promise<void> {
        let continuar = true;

        while (continuar) {
            console.log("\n--- Gerenciamento de Categorias ---");
            console.log("1. Criar Categoria");
            console.log("2. Listar Categorias");
            console.log("3. Buscar Categoria");
            console.log("4. Atualizar Categoria");
            console.log("5. Remover Categoria");
            console.log("6. Voltar ao Menu Principal");

            const opcao = await this.prompt("Escolha uma opção: ");

            switch (opcao) {
                case "1":
                    const nome = await this.prompt("Nome: ");
                    const descricao = await this.prompt("Descrição: ");
                    await this.categoriaService.criarCategoria(nome, descricao);
                    console.log("Categoria criada com sucesso!");
                    break;
                case "2":
                    const categorias = await this.categoriaService.listarCategorias();
                    console.table(categorias);
                    break;
                case "3":
                    const id = parseInt(await this.prompt("ID da Categoria: "));
                    const categoria = await this.categoriaService.buscarCategoria(id);
                    console.log(categoria || "Categoria não encontrada.");
                    break;
                case "4":
                    const idAtualizar = parseInt(await this.prompt("ID da Categoria: "));
                    const novoNome = await this.prompt("Novo Nome: ");
                    const novaDescricao = await this.prompt("Nova Descrição: ");
                    const atualizado = await this.categoriaService.atualizarCategoria(idAtualizar, novoNome, novaDescricao);
                    console.log(atualizado ? "Categoria atualizada com sucesso!" : "Categoria não encontrada.");
                    break;
                case "5":
                    const idRemover = parseInt(await this.prompt("ID da Categoria: "));
                    const removido = await this.categoriaService.removerCategoria(idRemover);
                    console.log(removido ? "Categoria removida com sucesso!" : "Categoria não encontrada.");
                    break;
                case "6":
                    console.log("Voltando ao menu principal...");
                    continuar = false; // Encerra o loop, mas não fecha o readline
                    break;
                default:
                    console.log("Opção inválida!");
            }
        }
    }

    private async prompt(pergunta: string): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question(pergunta, (resposta) => resolve(resposta.trim()));
        });
    }
}