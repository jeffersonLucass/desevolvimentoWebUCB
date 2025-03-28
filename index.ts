import promptSync from "prompt-sync";
import { CategoriaServiceCLI } from "./CategoriaServiceCLI";
import { ProdutoServiceCLI } from "./ProdutoServiceCLI";

const prompt = promptSync();

const categoriaServiceCLI = new CategoriaServiceCLI();
const produtoServiceCLI = new ProdutoServiceCLI();

function main() {
    while (true) {
        console.log("\n===== MENU PRINCIPAL =====");
        console.log("1. Gerenciar Categorias");
        console.log("2. Gerenciar Produtos");
        console.log("0. Sair");

        const opcao = prompt("Escolha uma opção: ");

        switch (opcao) {
            case "1":
                categoriaServiceCLI.menu();
                break;
            case "2":
                produtoServiceCLI.menu();
                break;
            case "0":
                console.log("Saindo do sistema... Até mais!");
                process.exit(0);
            default:
                console.log("Opção inválida! Tente novamente.");
        }
    }
}

main();
