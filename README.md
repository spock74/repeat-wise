# Repeat Wise

Repeat Wise é uma aplicação web moderna construída com Next.js 15 e TypeScript, projetada para alavancar o poder da Inteligência Artificial para otimizar tarefas e fluxos de trabalho. A aplicação conta com uma interface multilíngue, componentes de UI acessíveis e uma arquitetura escalável.

## ✨ Features

- **Integração com IA:** Utiliza o framework **Google Genkit** para orquestrar fluxos de IA e integrar modelos como o Gemini.
- **Suporte Multilíngue:** Totalmente internacionalizado com `next-intl`, oferecendo uma experiência nativa para diferentes usuários.
- **UI Moderna e Acessível:** Interface construída com **shadcn/ui**, **Radix UI** e **Tailwind CSS**, garantindo design moderno e acessibilidade.
- **Gerenciamento de Estado Eficiente:** Usa **Zustand** para um gerenciamento de estado global simples e poderoso.
- **Validação Robusta de Formulários:** Combina **React Hook Form** e **Zod** para criar formulários seguros e com excelente experiência de usuário.
- **Qualidade de Código:** O projeto é totalmente tipado com **TypeScript** e configurado com **ESLint** e **Prettier** para garantir a consistência e a qualidade do código.

## 🚀 Getting Started

Siga os passos abaixo para executar o projeto localmente.

### Pré-requisitos

- [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/) ou [pnpm](https://pnpm.io/)

### Instalação

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/seu-usuario/repeat-wise.git
    cd repeat-wise
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    # ou
    yarn install
    # ou
    pnpm install
    ```

3.  **Configure as Variáveis de Ambiente:**

    - Crie um arquivo `.env.local` na raiz do projeto.
    - Adicione as variáveis necessárias, como as chaves de API para os serviços do Google AI.

    ```env
    # Exemplo de .env.local
    GOOGLE_API_KEY="SUA_CHAVE_DE_API_AQUI"
    ```

4.  **Execute o servidor de desenvolvimento:**

    ```bash
    npm run dev
    ```

5.  Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação.

## 🛠️ Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento com o Turbopack.
- `npm run build`: Compila a aplicação para produção.
- `npm start`: Inicia o servidor de produção.
- `npm run lint`: Executa o linter (ESLint) para verificar a qualidade do código.
- `npm run typecheck`: Executa o compilador TypeScript para verificar erros de tipagem.

## 💻 Stack Tecnológica

- **Framework:** [Next.js](https://nextjs.org/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **IA:** [Google Genkit](https://firebase.google.com/docs/genkit)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI:** [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/)
- **Gerenciamento de Estado:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Formulários:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Internacionalização:** [next-intl](https://next-intl-docs.vercel.app/)
- **Qualidade de Código:** [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)
