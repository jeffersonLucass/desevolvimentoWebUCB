import * as readline from 'readline';
import { ProdutoService } from '../categoria_produto/ProdutoService';
import { Produto } from '../categoria_produto/Produto';

export class ProdutoServiceCLI {
    private produtoService: ProdutoService;
    private rl: readline.Interface;

    constructor() {
        this.produtoService = new ProdutoService();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    iniciar(): void {
        this.menu();
    }

    private menu(): void {
        console.log('\n--- Gestão de Produtos ---');
        console.log('1. Criar Produto');
        console.log('2. Listar Produtos');
        console.log('3. Buscar Produto');
        console.log('4. Atualizar Produto');
        console.log('5. Remover Produto');
        console.log('6. Sair');

        this.rl.question('Escolha uma opção: ', (opcao: string) => {
            switch (opcao) {
                case '1': this.criarProduto(); break;
                case '2': this.listarProdutos(); break;
                case '3': this.buscarProduto(); break;
                case '4': this.atualizarProduto(); break;
                case '5': this.removerProduto(); break;
                case '6': this.rl.close(); break;
                default: console.log('Opção inválida!'); this.menu();
            }
        });
    }

    private criarProduto(): void {
        this.rl.question('Nome: ', (nome: string) => {
            this.rl.question('Descrição: ', (descricao: string) => {
                this.rl.question('Preço: ', (preco: string) => {
                    this.rl.question('Quantidade: ', (quantidade: string) => {
                        this.rl.question('Categoria ID: ', (categoriaId: string) => {
                            const novoProduto: Produto = {
                                id: Date.now(),
                                nome,
                                descricao,
                                preco: parseFloat(preco),
                                quantidade: parseInt(quantidade),
                                categoriaId: parseInt(categoriaId),
                                dataCriacao: new Date(),
                                dataAtualizacao: new Date()
                            };
                            this.produtoService.criarProduto(novoProduto);
                            console.log('Produto criado com sucesso!');
                            this.menu();
                        });
                    });
                });
            });
        });
    }

    private listarProdutos(): void {
        console.log('\n--- Lista de Produtos ---');
        console.table(this.produtoService.listarProdutos());
        this.menu();
    }

    private buscarProduto(): void {
        this.rl.question('Digite o ID ou Nome do Produto: ', (busca: string) => {
            const criterio = isNaN(Number(busca)) ? busca : Number(busca);
            const produto = this.produtoService.buscarProduto(criterio);
            console.log(produto ? `Produto encontrado: ${JSON.stringify(produto, null, 2)}` : 'Produto não encontrado!');
            this.menu();
        });
    }

    private atualizarProduto(): void {
        this.rl.question('Digite o ID do produto a ser atualizado: ', (id: string) => {
            const produto = this.produtoService.buscarProduto(parseInt(id));
            if (!produto) {
                console.log('Produto não encontrado!');
                return this.menu();
            }

            this.rl.question('Novo Nome (ou pressione Enter para manter): ', (nome: string) => {
                this.rl.question('Nova Descrição (ou pressione Enter para manter): ', (descricao: string) => {
                    this.rl.question('Novo Preço (ou pressione Enter para manter): ', (preco: string) => {
                        this.rl.question('Nova Quantidade (ou pressione Enter para manter): ', (quantidade: string) => {
                            const dadosAtualizados: Partial<Produto> = {};

                            if (nome) dadosAtualizados.nome = nome;
                            if (descricao) dadosAtualizados.descricao = descricao;
                            if (preco) dadosAtualizados.preco = parseFloat(preco);
                            if (quantidade) dadosAtualizados.quantidade = parseInt(quantidade);

                            const atualizado = this.produtoService.atualizarProduto(parseInt(id), dadosAtualizados);
                            console.log(atualizado ? 'Produto atualizado com sucesso!' : 'Erro ao atualizar o produto.');
                            this.menu();
                        });
                    });
                });
            });
        });
    }

    private removerProduto(): void {
        this.rl.question('Digite o ID do produto a ser removido: ', (id: string) => {
            const produto = this.produtoService.buscarProduto(parseInt(id));
            if (produto) {
                this.produtoService.removerProduto(parseInt(id));
                console.log('Produto removido com sucesso!');
            } else {
                console.log('Produto não encontrado!');
            }
            this.menu();
        });
    }
}
