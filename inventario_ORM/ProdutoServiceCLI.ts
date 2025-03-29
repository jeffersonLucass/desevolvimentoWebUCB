import * as readline from "readline";
import { ProdutoService } from "./ProdutoService";
import { Produto } from "./Produto";

export class ProdutoServiceCLI {
    private produtoService: ProdutoService;
    private rl: readline.Interface;

    constructor() {
        this.produtoService = new ProdutoService();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }

    async iniciar(): Promise<void> {
        await this.menu();
    }

    private async menu(): Promise<void> {
        console.log("\n--- Gestão de Produtos ---");
        console.log("1. Criar Produto");
        console.log("2. Listar Produtos");
        console.log("3. Buscar Produto");
        console.log("4. Atualizar Produto");
        console.log("5. Remover Produto");
        console.log("6. Sair");

        const opcao = await this.prompt("Escolha uma opção: ");

        switch (opcao) {
            case "1":
                await this.criarProduto();
                break;
            case "2":
                await this.listarProdutos();
                break;
            case "3":
                await this.buscarProduto();
                break;
            case "4":
                await this.atualizarProduto();
                break;
            case "5":
                await this.removerProduto();
                break;
            case "6":
                console.log("Saindo...");
                this.rl.close();
                return;
            default:
                console.log("Opção inválida!");
        }

        await this.menu();
    }

    private async criarProduto(): Promise<void> {
        const nome = await this.prompt("Nome: ");
        const descricao = await this.prompt("Descrição: ");
        const preco = parseFloat(await this.prompt("Preço: "));
        const quantidade = parseInt(await this.prompt("Quantidade: "));

        // Listar categorias disponíveis
        const categorias = await this.produtoService.listarCategorias();
        if (categorias.length === 0) {
            console.log("Nenhuma categoria disponível. Crie uma categoria antes de adicionar um produto.");
            return;
        }

        console.log("\n--- Categorias Disponíveis ---");
        categorias.forEach((categoria, index) => {
            console.log(`${index + 1}. ${categoria.nome} - ${categoria.descricao}`);
        });

        const escolha = parseInt(await this.prompt("Escolha uma categoria pelo número: "));
        if (isNaN(escolha) || escolha < 1 || escolha > categorias.length) {
            console.log("Escolha inválida!");
            return;
        }

        const categoria = categorias[escolha - 1];

        const novoProduto: Produto = {
            id: 0, // Será gerado automaticamente pelo banco
            nome,
            descricao,
            preco,
            quantidade,
            categoria,
            dataCriacao: new Date(),
            dataAtualizacao: new Date(),
        };

        await this.produtoService.criarProduto(novoProduto);
        console.log("Produto criado com sucesso!");
    }

    private async listarProdutos(): Promise<void> {
        const produtos = await this.produtoService.listarProdutos();
        if (produtos.length === 0) {
            console.log("Nenhum produto encontrado.");
            return;
        }

        console.log("\n--- Lista de Produtos ---");
        produtos.forEach((produto) => {
            console.log(`ID: ${produto.id} | Nome: ${produto.nome} | Categoria: ${produto.categoria?.nome || "Sem Categoria"}`);
        });
    }

    private async buscarProduto(): Promise<void> {
        const id = parseInt(await this.prompt("Digite o ID do Produto: "));
        const produto = await this.produtoService.buscarProduto(id);
        console.log(produto ? `Produto encontrado: ${JSON.stringify(produto, null, 2)}` : "Produto não encontrado!");
    }

    private async atualizarProduto(): Promise<void> {
        const id = parseInt(await this.prompt("Digite o ID do produto a ser atualizado: "));
        const produto = await this.produtoService.buscarProduto(id);
        if (!produto) {
            console.log("Produto não encontrado!");
            return;
        }

        const nome = await this.prompt("Novo Nome (ou pressione Enter para manter): ");
        const descricao = await this.prompt("Nova Descrição (ou pressione Enter para manter): ");
        const preco = await this.prompt("Novo Preço (ou pressione Enter para manter): ");
        const quantidade = await this.prompt("Nova Quantidade (ou pressione Enter para manter): ");

        const dadosAtualizados: Partial<Produto> = {};
        if (nome) dadosAtualizados.nome = nome;
        if (descricao) dadosAtualizados.descricao = descricao;
        if (preco) dadosAtualizados.preco = parseFloat(preco);
        if (quantidade) dadosAtualizados.quantidade = parseInt(quantidade);

        const atualizado = await this.produtoService.atualizarProduto(id, dadosAtualizados);
        console.log(atualizado ? "Produto atualizado com sucesso!" : "Erro ao atualizar o produto.");
    }

    private async removerProduto(): Promise<void> {
        const id = parseInt(await this.prompt("Digite o ID do produto a ser removido: "));
        const removido = await this.produtoService.removerProduto(id);
        console.log(removido ? "Produto removido com sucesso!" : "Produto não encontrado!");
    }

    private prompt(pergunta: string): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question(pergunta, (resposta) => resolve(resposta.trim()));
        });
    }
}