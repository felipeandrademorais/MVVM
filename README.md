# MVVM Architecture Study Case 🚀

Este projeto é um **estudo de caso da arquitetura MVVM (Model-View-ViewModel)** implementado em React com TypeScript, utilizando a API da NASA para exibir dados astronômicos.

## 🎬 Demonstração

<div align="center">

![Demonstração da Aplicação](https://github.com/user-attachments/assets/b16b97e4-4449-482f-8115-009d2837800e)

_Navegação entre as funcionalidades de APOD e exploração de fotos dos rovers de Marte_

</div>

## 📖 Sobre o Projeto

Uma aplicação web que demonstra a implementação prática do padrão MVVM, permitindo aos usuários:

-   Visualizar a Foto Astronômica do Dia (APOD) da NASA
-   Explorar fotos capturadas pelos rovers de Marte (Curiosity, Opportunity, Spirit)
-   Buscar imagens por data específica ou Sol (dia marciano)

## 🛠️ Tecnologias Utilizadas

### Core

-   **React 18** - Biblioteca para interfaces de usuário
-   **TypeScript** - Tipagem estática para JavaScript
-   **Vite** - Build tool e dev server
-   **Tailwind CSS** - Framework CSS utility-first

### State Management & Data Fetching

-   **TanStack Query (React Query)** - Cache e sincronização de dados
-   **Axios** - Cliente HTTP para requisições

### Desenvolvimento

-   **ESLint** - Linter para JavaScript/TypeScript
-   **PostCSS** - Processamento de CSS

### API

-   **NASA Open Data API** - Dados astronômicos oficiais da NASA

## 🏗️ Arquitetura MVVM

### Model

Localizado em `src/models/`

-   **ApodModel.ts** - Tipagens para dados da Foto Astronômica do Dia
-   **MarsRoverModel.ts** - Tipagens para dados dos rovers de Marte

### View

Localizado em `src/views/`

-   **ApodView.tsx** - Interface para visualização da APOD
-   **MarsRoverView.tsx** - Interface para exploração de fotos dos rovers
-   **Navbar.tsx** - Componente de navegação
-   **components/** - Componentes reutilizáveis (Card, Input, LoadingSpinner, etc.)

### ViewModel

Localizado em `src/viewModels/`

-   **useApodViewModel.ts** - Lógica de negócio para APOD
-   **useMarsRoverViewModel.ts** - Lógica de negócio para rovers de Marte
-   **utils/** - Utilitários de validação e formatação
-   **types/** - Tipos compartilhados

### Services

Localizado em `src/services/`

-   **nasaService.ts** - Comunicação com a API da NASA
-   **config.ts** - Configurações da aplicação

## 📁 Estrutura do Projeto

```
src/
├── models/                 # 📊 Modelos de dados (M)
│   ├── ApodModel.ts
│   └── MarsRoverModel.ts
├── views/                  # 🎨 Componentes de Interface (V)
│   ├── ApodView.tsx
│   ├── MarsRoverView.tsx
│   ├── Navbar.tsx
│   └── components/
│       ├── Card.tsx
│       ├── ErrorMessage.tsx
│       ├── Input.tsx
│       ├── LoadingSpinner.tsx
│       └── PhotoGallery.tsx
├── viewModels/            # 🧠 Lógica de Apresentação (VM)
│   ├── useApodViewModel.ts
│   ├── useMarsRoverViewModel.ts
│   ├── types/
│   │   └── commonTypes.ts
│   └── utils/
│       ├── errorHandling.ts
│       └── validationUtils.ts
└── services/              # 🌐 Camada de Dados
    ├── nasaService.ts
    └── config.ts
```

## 🎯 Princípios MVVM Implementados

### Separação de Responsabilidades

-   **Model**: Define a estrutura dos dados
-   **View**: Responsável apenas pela apresentação
-   **ViewModel**: Gerencia estado e lógica de negócio

### Data Binding

-   ViewModels retornam estado reativo usando React hooks
-   Views se conectam aos ViewModels através de custom hooks
-   Mudanças de estado atualizam automaticamente a interface

### Testabilidade

-   Lógica de negócio isolada nos ViewModels
-   Services independentes para comunicação externa
-   Componentes focados apenas em apresentação

## 🚀 Como Executar

### Pré-requisitos

-   Node.js 18+
-   npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Adicione sua NASA API Key no arquivo .env
```

### Execução

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 🔧 Configuração da API

1. Obtenha uma API key gratuita em: https://api.nasa.gov/
2. Crie um arquivo `.env` na raiz do projeto
3. Adicione: `VITE_NASA_API_KEY=sua_api_key_aqui`

## ✨ Funcionalidades

### APOD (Astronomy Picture of the Day)

-   Visualização da foto astronômica do dia
-   Busca por data específica
-   Informações detalhadas sobre cada imagem

### Mars Rover Photos

-   Exploração de fotos dos rovers Curiosity, Opportunity e Spirit
-   Busca por Sol (dia marciano)
-   Controle manual de busca com botão
-   Limite configurável de fotos exibidas

## 📚 Conceitos Demonstrados

-   **Custom Hooks** como ViewModels
-   **React Query** para cache e estado de servidor
-   **TypeScript** para tipagem forte
-   **Tailwind CSS** para styling utilitário
-   **Error Boundaries** e tratamento de erros
-   **Loading States** e UX responsiva
-   **Validação de dados** em tempo real

## 🎨 Design System

-   Interface moderna com gradientes e glassmorphism
-   Responsivo para mobile e desktop
-   Componentes reutilizáveis e consistentes
-   Estados visuais claros (loading, error, success)

---

Este projeto serve como referência prática para implementação da arquitetura MVVM em aplicações React modernas, demonstrando boas práticas de organização de código, separação de responsabilidades e desenvolvimento sustentável.
