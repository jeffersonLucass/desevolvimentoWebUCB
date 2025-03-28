"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CategoriaServiceCLI_1 = require("./CategoriaServiceCLI");
var ProdutoServiceCLI_1 = require("./ProdutoServiceCLI");
function main() {
    console.log("\n--- Sistema de Gestão ---");
    console.log("1. Gerenciar Categorias");
    console.log("2. Gerenciar Produtos");
    console.log("3. Sair");
    process.stdout.write("Escolha uma opção: ");
    process.stdin.once("data", function (data) {
        var opcao = data.toString().trim();
        switch (opcao) {
            case "1":
                new CategoriaServiceCLI_1.CategoriaServiceCLI().iniciar();
                break;
            case "2":
                new ProdutoServiceCLI_1.ProdutoServiceCLI().iniciar();
                break;
            case "3":
                console.log("Saindo...");
                process.exit();
                break;
            default:
                console.log("Opção inválida!");
                main();
        }
    });
}
main();
