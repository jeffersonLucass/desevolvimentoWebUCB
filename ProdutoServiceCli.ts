import readline from 'readline';
import { ProdutoService } from './ProdutoService';
import { Produto } from './Produto';

const produtoService = new ProdutoService();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function menu(): void {
    console.log('\n--- Gestão de Produtos ---');
    console.log('1. Criar Produto');
    console.log('2. Listar Produtos');
    console.log('3. Buscar Produto');
    console.log('4. Atualizar Produto');
    console.log('5. Remover Produto');
    console.log('6. Sair');

    rl.question('Escolha uma opção: ', (opcao: string) => {
        switch (opcao) {
            case '1': criarProduto(); break;
            case '2': listarProdutos(); break;
            case '3': buscarProduto(); break;
            case '4': atualizarProduto(); break;
            case '5': removerProduto(); break;
            case '6': rl.close(); break;
            default: console.log('Opção inválida!'); menu();
        }
    });
}

function criarProduto(): void {
    rl.question('Nome: ', (nome: string) => {
        rl.question('Descrição: ', (descricao: string) => {
            rl.question('Preço: ', (preco: string) => {
                rl.question('Quantidade: ', (quantidade: string) => {
                    rl.question('Categoria ID: ', (categoriaId: string) => {
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
                        produtoService.criarProduto(novoProduto);
                        console.log('Produto criado com sucesso!');
                        menu();
                    });
                });
            });
        });
    });
}

function listarProdutos(): void {
    console.log('\n--- Lista de Produtos ---');
    console.table(produtoService.listarProdutos());
    menu();
}

function buscarProduto(): void {
    rl.question('Digite o ID ou Nome do Produto: ', (busca: string) => {
        const criterio = isNaN(Number(busca)) ? busca : Number(busca);
        const produto = produtoService.buscarProduto(criterio);
        if (produto) {
            console.log('Produto encontrado:', produto);
        } else {
            console.log('Produto não encontrado!');
        }
        menu();
    });
}

function atualizarProduto(): void {
    rl.question('Digite o ID do produto a ser atualizado: ', (id: string) => {
        const produto = produtoService.buscarProduto(parseInt(id));
        if (!produto) {
            console.log('Produto não encontrado!');
            return menu(); 

        // Se o produto for encontrado, permite que o usuário atualize os dados
        rl.question('Novo Nome (ou pressione Enter para manter): ', (nome: string) => {
            rl.question('Nova Descrição (ou pressione Enter para manter): ', (descricao: string) => {
                rl.question('Novo Preço (ou pressione Enter para manter): ', (preco: string) => {
                    rl.question('Nova Quantidade (ou pressione Enter para manter): ', (quantidade: string) => {
                        const dadosAtualizados: Partial<Produto> = {};
                        if (nome) dadosAtualizados.nome = nome;
                        if (descricao) dadosAtualizados.descricao = descricao;
                        if (preco) {
                            const precoNum = parseFloat(preco);
                            if (isNaN(precoNum) || precoNum <= 0) {
                                console.log('Preço deve ser um número positivo!');
                                return atualizarProduto(); 
                            dadosAtualizados.preco = precoNum;
                        }
                        if (quantidade) {
                            const quantidadeNum = parseInt(quantidade);
                            if (isNaN(quantidadeNum) || quantidadeNum < 0) {
                                console.log('Quantidade deve ser um inteiro não negativo!');
                                return atualizarProduto(); 
                            }
                            dadosAtualizados.quantidade = quantidadeNum;
                        }
                        
                        const atualizado = produtoService.atualizarProduto(parseInt(id), dadosAtualizados);
                        if (atualizado) {
                            console.log('Produto atualizado com sucesso!');
                        } else {
                            console.log('Erro ao atualizar o produto.');
                        }
                        menu();
                    });
                });
            });
        });
    });
}


function removerProduto(): void {
    rl.question('Digite o ID do produto a ser removido: ', (id: string) => {
        const produto = produtoService.buscarProduto(parseInt(id));
        if (produto) {
            produtoService.removerProduto(parseInt(id));
            console.log('Produto removido com sucesso!');
        } else {
            console.log('Produto não encontrado!');
        }
        menu();
    });
}

menu();
