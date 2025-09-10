# Relatório da Aplicação: Repeat Wise

## Visão Geral do Projeto

O Repeat Wise é uma aplicação moderna de flashcards construída com Next.js e impulsionada por Inteligência Artificial. Ele permite que os usuários gerem perguntas a partir de documentos ou parâmetros, estudem essas perguntas e acompanhem seu desempenho.

## Tecnologias Utilizadas

- **Framework:** Next.js
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS, shadcn/ui
- **Internacionalização (i18n):** next-intl
- **Gerenciamento de Estado:** Zustand
- **Inteligência Artificial (IA):** Genkit
- **Gráficos:** recharts

## Estrutura do Projeto

A estrutura de diretórios principal da aplicação é a seguinte:

- `src/app/[locale]`: Contém as páginas da aplicação, organizadas por localidade.
- `src/components`: Contém os componentes React, incluindo componentes de UI, formulários e layouts.
- `src/store`: Contém os stores do Zustand para gerenciamento de estado global.
- `src/lib`: Contém funções utilitárias.
- `src/ai`: Contém os fluxos de IA do Genkit.
- `messages`: Contém os arquivos de tradução para internacionalização.

## Autenticação

Foram implementadas páginas e formulários básicos de sign-in e sign-up. A lógica de autenticação real (comunicação com um backend, gerenciamento de sessão, etc.) ainda não foi implementada.

## Internacionalização (i18n)

A aplicação utiliza a biblioteca `next-intl` para internacionalização. As traduções são armazenadas em arquivos JSON na pasta `messages`, com um arquivo para cada localidade suportada (`en.json`, `pt.json`).

## Gerenciamento de Estado

O gerenciamento de estado global da aplicação é feito com a biblioteca Zustand. Os stores estão localizados na pasta `src/store`.

## Componentes de UI

Os componentes de UI são construídos utilizando `shadcn/ui` e estão localizados em `src/components/ui`. Componentes mais complexos e específicos de cada página estão organizados em subdiretórios dentro de `src/components`.

## Integração com IA

A aplicação utiliza o Genkit para integração com IA. Os fluxos de IA estão localizados em `src/ai/flows` e incluem:

- `generate-questions-from-document.ts`: Fluxo para gerar perguntas a partir de um documento.
- `generate-questions-from-parameters.ts`: Fluxo para gerar perguntas com base em parâmetros definidos pelo usuário.
