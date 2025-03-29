// filepath: c:\Users\dougl\OneDrive\Documents\estudos\desevolvimentoWebUCB\inventario_ORM\Produto.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Categoria } from "./Categoria";

@Entity()
export class Produto {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome!: string;

    @Column()
    descricao!: string;

    @Column("decimal")
    preco!: number;

    @Column()
    quantidade!: number;

    @ManyToOne(() => Categoria, (categoria) => categoria.id)
    categoria!: Categoria;

    @Column()
    dataCriacao!: Date;

    @Column()
    dataAtualizacao!: Date;
}