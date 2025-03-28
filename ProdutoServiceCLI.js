"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutoServiceCLI = void 0;
var readline = require("readline");
var ProdutoService_1 = require("./ProdutoService");
var ProdutoServiceCLI = /** @class */ (function () {
    function ProdutoServiceCLI() {
        this.produtoService = new ProdutoService_1.ProdutoService();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    ProdutoServiceCLI.prototype.iniciar = function () {
        this.menu();
    };
    ProdutoServiceCLI.prototype.menu = function () {
        var _this = this;
        console.log('\n--- Gestão de Produtos ---');
        console.log('1. Criar Produto');
        console.log('2. Listar Produtos');
        console.log('3. Buscar Produto');
        console.log('4. Atualizar Produto');
        console.log('5. Remover Produto');
        console.log('6. Sair');
        this.rl.question('Escolha uma opção: ', function (opcao) {
            switch (opcao) {
                case '1':
                    _this.criarProduto();
                    break;
                case '2':
                    _this.listarProdutos();
                    break;
                case '3':
                    _this.buscarProduto();
                    break;
                case '4':
                    _this.atualizarProduto();
                    break;
                case '5':
                    _this.removerProduto();
                    break;
                case '6':
                    _this.rl.close();
                    break;
                default:
                    console.log('Opção inválida!');
                    _this.menu();
            }
        });
    };
    ProdutoServiceCLI.prototype.criarProduto = function () {
        var _this = this;
        this.rl.question('Nome: ', function (nome) {
            _this.rl.question('Descrição: ', function (descricao) {
                _this.rl.question('Preço: ', function (preco) {
                    _this.rl.question('Quantidade: ', function (quantidade) {
                        _this.rl.question('Categoria ID: ', function (categoriaId) {
                            var novoProduto = {
                                id: Date.now(),
                                nome: nome,
                                descricao: descricao,
                                preco: parseFloat(preco),
                                quantidade: parseInt(quantidade),
                                categoriaId: parseInt(categoriaId),
                                dataCriacao: new Date(),
                                dataAtualizacao: new Date()
                            };
                            _this.produtoService.criarProduto(novoProduto);
                            console.log('Produto criado com sucesso!');
                            _this.menu();
                        });
                    });
                });
            });
        });
    };
    ProdutoServiceCLI.prototype.listarProdutos = function () {
        console.log('\n--- Lista de Produtos ---');
        console.table(this.produtoService.listarProdutos());
        this.menu();
    };
    ProdutoServiceCLI.prototype.buscarProduto = function () {
        var _this = this;
        this.rl.question('Digite o ID ou Nome do Produto: ', function (busca) {
            var criterio = isNaN(Number(busca)) ? busca : Number(busca);
            var produto = _this.produtoService.buscarProduto(criterio);
            console.log(produto ? "Produto encontrado: ".concat(JSON.stringify(produto, null, 2)) : 'Produto não encontrado!');
            _this.menu();
        });
    };
    ProdutoServiceCLI.prototype.atualizarProduto = function () {
        var _this = this;
        this.rl.question('Digite o ID do produto a ser atualizado: ', function (id) {
            var produto = _this.produtoService.buscarProduto(parseInt(id));
            if (!produto) {
                console.log('Produto não encontrado!');
                return _this.menu();
            }
            _this.rl.question('Novo Nome (ou pressione Enter para manter): ', function (nome) {
                _this.rl.question('Nova Descrição (ou pressione Enter para manter): ', function (descricao) {
                    _this.rl.question('Novo Preço (ou pressione Enter para manter): ', function (preco) {
                        _this.rl.question('Nova Quantidade (ou pressione Enter para manter): ', function (quantidade) {
                            var dadosAtualizados = {};
                            if (nome)
                                dadosAtualizados.nome = nome;
                            if (descricao)
                                dadosAtualizados.descricao = descricao;
                            if (preco)
                                dadosAtualizados.preco = parseFloat(preco);
                            if (quantidade)
                                dadosAtualizados.quantidade = parseInt(quantidade);
                            var atualizado = _this.produtoService.atualizarProduto(parseInt(id), dadosAtualizados);
                            console.log(atualizado ? 'Produto atualizado com sucesso!' : 'Erro ao atualizar o produto.');
                            _this.menu();
                        });
                    });
                });
            });
        });
    };
    ProdutoServiceCLI.prototype.removerProduto = function () {
        var _this = this;
        this.rl.question('Digite o ID do produto a ser removido: ', function (id) {
            var produto = _this.produtoService.buscarProduto(parseInt(id));
            if (produto) {
                _this.produtoService.removerProduto(parseInt(id));
                console.log('Produto removido com sucesso!');
            }
            else {
                console.log('Produto não encontrado!');
            }
            _this.menu();
        });
    };
    return ProdutoServiceCLI;
}());
exports.ProdutoServiceCLI = ProdutoServiceCLI;
