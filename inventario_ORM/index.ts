import { CategoriaServiceCLI } from "./CategoriaServiceCLI";
import { ProdutoServiceCLI } from "./ProdutoServiceCLI";
import { initializeDatabase, closeDatabase } from "./data_source";

async function main() {
    try {
        // Inicializa o banco de dados
        await initializeDatabase();

        console.log("\n--- Sistema de Gestão ---");
        console.log("1. Gerenciar Categorias");
        console.log("2. Gerenciar Produtos");
        console.log("3. Sair");

        process.stdout.write("Escolha uma opção: ");

        process.stdin.once("data", async (data) => {
            const opcao = data.toString().trim();

            switch (opcao) {
                case "1":
                    await new CategoriaServiceCLI().iniciar();
                    break;
                case "2":
                    await new ProdutoServiceCLI().iniciar();
                    break;
                case "3":
                    console.log("Saindo...");
                    await closeDatabase(); // Encerra a conexão com o banco de dados
                    process.exit();
                    break;
                default:
                    console.log("Opção inválida!");
                    main(); // Reinicia o menu
            }
        });
    } catch (error) {
        console.error("Erro durante a execução:", error);
        await closeDatabase(); // Garante que a conexão seja encerrada em caso de erro
    }
}

main();