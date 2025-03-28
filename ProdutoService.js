"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutoService = void 0;
var ProdutoService = /** @class */ (function () {
    function ProdutoService() {
        this.produtos = [];
    }
    ProdutoService.prototype.criarProduto = function (produto) {
        this.produtos.push(produto);
    };
    ProdutoService.prototype.listarProdutos = function () {
        return this.produtos;
    };
    ProdutoService.prototype.buscarProduto = function (criterio) {
        if (typeof criterio === 'number') {
            return this.produtos.find(function (p) { return p.categoriaId === criterio; });
        }
        return this.produtos.find(function (p) { return p.nome.toLowerCase() === criterio.toLowerCase(); });
    };
    ProdutoService.prototype.atualizarProduto = function (id, dados) {
        var produto = this.produtos.find(function (p) { return p.categoriaId === id; });
        if (produto) {
            Object.assign(produto, dados, { dataAtualizacao: new Date() });
            return true;
        }
        return false;
    };
    ProdutoService.prototype.removerProduto = function (id) {
        var index = this.produtos.findIndex(function (p) { return p.categoriaId === id; });
        if (index !== -1) {
            this.produtos.splice(index, 1);
            return true;
        }
        return false;
    };
    return ProdutoService;
}());
exports.ProdutoService = ProdutoService;
