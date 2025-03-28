"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaServiceCLI = void 0;
var readlineSync = require("readline-sync");
var CategoriaService_1 = require("./CategoriaService");
var CategoriaServiceCLI = /** @class */ (function () {
    function CategoriaServiceCLI() {
        this.categoriaService = new CategoriaService_1.CategoriaService();
        this.produtos = [];
    }
    CategoriaServiceCLI.prototype.menuCategorias = function () {
        while (true) {
            console.log("\nGerenciamento de Categorias");
            console.log("1 - Criar Categoria");
            console.log("2 - Listar Categorias");
            console.log("3 - Buscar Categoria");
            console.log("4 - Atualizar Categoria");
            console.log("5 - Remover Categoria");
            console.log("0 - Voltar");
            var opcao = readlineSync.question("Escolha uma opcao: ");
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
    };
    CategoriaServiceCLI.prototype.criarCategoria = function () {
        var nome = readlineSync.question("Nome da categoria: ");
        var descricao = readlineSync.question("Descricao da categoria: ");
        this.categoriaService.criarCategoria(nome, descricao);
        console.log("Categoria criada com sucesso!");
    };
    CategoriaServiceCLI.prototype.listarCategorias = function () {
        console.log("\nLista de Categorias:", this.categoriaService.listarCategorias());
    };
    CategoriaServiceCLI.prototype.buscarCategoria = function () {
        var termo = readlineSync.question("Digite o ID ou Nome da categoria: ");
        var categoria = isNaN(Number(termo))
            ? this.categoriaService.buscarCategoria(termo)
            : this.categoriaService.buscarCategoria(Number(termo));
        console.log(categoria ? categoria : "Categoria nao encontrada");
    };
    CategoriaServiceCLI.prototype.atualizarCategoria = function () {
        var id = Number(readlineSync.question("ID da categoria a atualizar: "));
        var nome = readlineSync.question("Novo nome (deixe vazio para manter): ");
        var descricao = readlineSync.question("Nova descricao (deixe vazio para manter): ");
        var atualizado = this.categoriaService.atualizarCategoria(id, nome || undefined, descricao || undefined);
        console.log(atualizado ? "Categoria atualizada com sucesso!" : "Categoria nao encontrada");
    };
    CategoriaServiceCLI.prototype.removerCategoria = function () {
        var id = Number(readlineSync.question("ID da categoria a remover: "));
        var removido = this.categoriaService.removerCategoria(id, this.produtos);
        console.log(removido ? "Categoria removida com sucesso!" : "Nao foi possivel remover a categoria.");
    };
    return CategoriaServiceCLI;
}());
exports.CategoriaServiceCLI = CategoriaServiceCLI;
