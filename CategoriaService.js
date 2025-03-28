"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaService = void 0;
var CategoriaService = /** @class */ (function () {
    function CategoriaService() {
        this.categorias = [];
        this.nextId = 1;
    }
    CategoriaService.prototype.criarCategoria = function (nome, descricao) {
        var novaCategoria = {
            id: this.nextId++,
            nome: nome,
            descricao: descricao,
            dataCriacao: new Date(),
        };
        this.categorias.push(novaCategoria);
        return novaCategoria;
    };
    CategoriaService.prototype.listarCategorias = function () {
        return this.categorias;
    };
    CategoriaService.prototype.buscarCategoria = function (idOuNome) {
        return this.categorias.find(function (cat) { return cat.id === idOuNome || cat.nome === idOuNome; });
    };
    CategoriaService.prototype.atualizarCategoria = function (id, nome, descricao) {
        var categoria = this.categorias.find(function (cat) { return cat.id === id; });
        if (categoria) {
            if (nome)
                categoria.nome = nome;
            if (descricao)
                categoria.descricao = descricao;
            return true;
        }
        return false;
    };
    CategoriaService.prototype.removerCategoria = function (id, produtos) {
        if (produtos.some(function (prod) { return prod.categoriaId === id; })) {
            console.log("Não é possível remover a categoria, pois há produtos associados.");
            return false;
        }
        var index = this.categorias.findIndex(function (cat) { return cat.id === id; });
        if (index !== -1) {
            this.categorias.splice(index, 1);
            return true;
        }
        return false;
    };
    return CategoriaService;
}());
exports.CategoriaService = CategoriaService;
