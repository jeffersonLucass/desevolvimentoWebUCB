import "reflect-metadata";
import { DataSource } from "typeorm";
import { Categoria } from "./Categoria";
import { Produto } from "./Produto";

export const AppDataSource = new DataSource({
    type: "sqlite", // Tipo do banco de dados
    database: "database.sqlite", // Nome do arquivo do banco de dados
    synchronize: true, // Cria as tabelas automaticamente com base nas entidades
    logging: true, // Ativa logs para depuração
    entities: [Categoria, Produto], // Registra as entidades do projeto
});

/**
 * Inicializa a conexão com o banco de dados.
 */
export async function initializeDatabase(): Promise<void> {
    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
            console.log("Conexão com o banco de dados estabelecida!");
        }
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
        throw error;
    }
}

/**
 * Encerra a conexão com o banco de dados.
 */
export async function closeDatabase(): Promise<void> {
    try {
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
            console.log("Conexão com o banco de dados encerrada.");
        }
    } catch (error) {
        console.error("Erro ao encerrar a conexão com o banco de dados:", error);
        throw error;
    }
}