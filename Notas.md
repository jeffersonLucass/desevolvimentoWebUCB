# Notas.md

Este arquivo contém exemplos descontextualizados, anotações, estudos e observações sobre TypeScript e sua estrutura, sobre como foi feito o trabalho e demonstração de boas práticas de programação.

---

## 📌 TypeScript
Utilizamos TypeScript para garantir tipagem estática, proporcionando maior segurança e clareza no código.

---

## 🛠️ Modularização
Organizamos o código em módulos, separando responsabilidades e facilitando a manutenção.

### Exemplo de Modularização:
#### 🔹 Módulo de Interface de Usuário (`ui.ts`):
```typescript
export function renderizarPagina(html: string): void {
    console.log("Renderizando página com o seguinte conteúdo:");
    console.log(html);
}
```
#### 🔹 Módulo de Servidor (`server.ts`):
```typescript
import { renderizarPagina } from './ui';

export function iniciarServidor(porta: number): void {
    console.log(`Servidor iniciado na porta ${porta}`);
    const conteudo = "<h1>Bem-vindo ao nosso site!</h1>";
    renderizarPagina(conteudo);
}
```
#### 🔹 Arquivo Principal (`index.ts`):
```typescript
import { iniciarServidor } from './server';

iniciarServidor(8080);
```

---

## 🏗️ Persistência em Memória
Implementamos estruturas de dados para armazenar informações durante a execução do programa.

### Exemplo de Armazenamento de Sessões de Usuários:
```typescript
interface Sessao {
    id: string;
    usuario: string;
    dataInicio: Date;
}

const sessoesAtivas: Map<string, Sessao> = new Map();

function iniciarSessao(usuario: string): string {
    const idSessao = Math.random().toString(36).substr(2, 9);
    const novaSessao: Sessao = {
        id: idSessao,
        usuario,
        dataInicio: new Date(),
    };
    sessoesAtivas.set(idSessao, novaSessao);
    return idSessao;
}
```

---

## 🔡 Tipos Básicos e Anotações, respectivamente, de Tipo
Alguns tipos básicos de variáveis que usamos foram:
```typescript
let url: string = "https://www.exemplo.com";
let porta: number = 443;
let seguro: boolean = true;
```

---

## 🔀 Tipos Condicionais, Intersection Types e Union Types
```typescript
type RespostaServidor = "sucesso" | "erro" | "pendente";

type Recurso = {
    url: string;
    metodo: string;
};

type Autenticacao = {
    token: string;
};

type RecursoProtegido = Recurso & Autenticacao;
```

---

## 📝 Interfaces e Tipos Personalizados
```typescript
interface RequisicaoHTTP {
    metodo: string;
    url: string;
    cabecalhos?: Record<string, string>; // Propriedade opcional
}
```

---

## 🔧 Funções em TypeScript
```typescript
function processarRequisicao(requisicao: RequisicaoHTTP): void {
    console.log(`Processando ${requisicao.metodo} para ${requisicao.url}`);
}
```

---

## 🏛️ Classes, Herança e Modificadores de Acesso
```typescript
class Componente {
    constructor(protected nome: string) {}

    renderizar(): void {
        console.log(`Renderizando componente: ${this.nome}`);
    }
}

class Botao extends Componente {
    constructor(nome: string, private acao: () => void) {
        super(nome);
    }

    clicar(): void {
        console.log(`Botão ${this.nome} clicado.`);
        this.acao();
    }
}
```

---

## 🏷️ Generics
```typescript
class Repositorio<T> {
    private itens: T[] = [];

    adicionar(item: T): void {
        this.itens.push(item);
    }

    obterTodos(): T[] {
        return this.itens;
    }
}
```

---

## 🔢 Enums e Mapeamento de Valores
```typescript
enum MetodoHTTP {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}
```

---

## ⚙️ Configuração do `tsconfig.json`
No arquivo tsconfig.json, podemos configurar diversas opções para o compilador TypeScript. Por exemplo, para garantir a compatibilidade com navegadores modernos e habilitar verificações estritas, podemos utilizar a seguinte configuração:​

Arquivo `tsconfig.json`-
```json
{
  "compilerOptions": {
    "target": "ES2015", // Define o padrão ECMAScript para a saída
    "module": "commonjs", // Especifica o sistema de módulos
    "strict": true, // Habilita verificações estritas
    "outDir": "./dist" // Diretório de saída dos arquivos compilados
  }
}
```

---

## 🗄️ TypeORM
Para persistência de dados em bancos de dados, utilizamos o TypeORM.

### Exemplo de Entidade Representando um Usuário:
```typescript
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    email: string;
}
```

---

### 🚀 Desafios

Durante o desenvolvimento do projeto, enfrentamos diversos desafios técnicos e conceituais. Entre os principais, destacamos:

- Execução do CRUD: Tivemos dificuldades em implementar corretamente as operações de Create, Read, Update e Delete, garantindo que os dados fossem manipulados corretamente e refletissem as mudanças no banco de dados.

- Configuração de Categorias no tsconfig.json: Ajustar a configuração para garantir o correto reconhecimento das categorias foi um problema, exigindo refinamento das opções do arquivo JSON.

- Integração com Banco de Dados: Encontramos desafios na integração do banco de dados, especialmente na correta utilização de imports e exports dentro do projeto, garantindo compatibilidade entre os módulos e evitando erros de importação.

- Gerenciamento de Tipagem Dinâmica: Adaptar o código para utilizar tipagem estática com TypeScript foi um desafio, exigindo a conversão de trechos escritos originalmente sem tipagem.

---

**Esses exemplos demonstram a aplicação dos conceitos de TypeScript em componentes relacionados à internet, promovendo uma arquitetura modular e tipada em todo o nosso projeto.**



