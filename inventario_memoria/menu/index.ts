import { menuCategorias } from "./CategoriaServiceCLI";
import { ProdutoServiceCLI } from "./ProdutoServiceCLI";

function main() {
    console.log("\n--- Sistema de Gestão ---");
    console.log("1. Gerenciar Categorias");
    console.log("2. Gerenciar Produtos");
    console.log("3. Sair");

    process.stdout.write("Escolha uma opção: ");

    process.stdin.once("data", (data) => {
        const opcao = data.toString().trim();

        switch (opcao) {
            case "1":
                menuCategorias();
                break;
            case "2":
                const produtoCLI = new ProdutoServiceCLI();
                produtoCLI.iniciar();
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
