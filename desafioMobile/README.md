# 🧠 Quiz App - Aplicativo de Quiz Interativo

Um aplicativo mobile desenvolvido em React Native com Expo que oferece uma experiência interativa de quiz com histórico de resultados, animações fluidas e interface moderna.

## � Sobre o Projeto

Este é um aplicativo de quiz que permite aos usuários:

- Responder perguntas de conhecimentos gerais
- Visualizar resultados detalhados
- Acompanhar histórico de tentativas
- Experiência visual atraente com animações

## 🚀 Tecnologias Utilizadas

### **Frontend & Framework**
- **React Native** (0.79.5) - Framework principal para desenvolvimento mobile
- **Expo** (~53.0.17) - Plataforma para desenvolvimento React Native
- **TypeScript** (~5.8.3) - Tipagem estática para JavaScript
- **Expo Router** (~5.1.3) - Sistema de navegação baseado em arquivos

### **Estilização & UI**
- **NativeWind** (^4.1.23) - Tailwind CSS para React Native
- **TailwindCSS** (^3.4.17) - Framework CSS utilitário
- **Expo Linear Gradient** (~14.1.5) - Gradientes lineares
- **React Native Reanimated** (~3.17.4) - Animações performáticas

### **Componentes & Ícones**
- **Expo Vector Icons** (^14.1.0) - Biblioteca de ícones
- **React Native Confetti Cannon** (^1.5.2) - Efeitos de confetti

### **Navegação & Estado**
- **React Navigation** (^7.1.6) - Sistema de navegação
- **Context API** - Gerenciamento de estado global
- **Expo File System** (^18.1.11) - Manipulação de arquivos

### **Desenvolvimento & Qualidade**
- **ESLint** (^9.31.0) - Linter para código JavaScript/TypeScript
- **Jest** (^29.2.1) - Framework de testes
- **Prettier** - Formatação de código
- **Zod** (^4.0.5) - Validação de schemas

## 📋 Funcionalidades

- ✅ **Quiz Interativo**: Perguntas de múltipla escolha com feedback imediato
- ✅ **Sistema de Pontuação**: Cálculo automático de pontuação e percentual
- ✅ **Histórico Detalhado**: Visualização de tentativas anteriores com detalhes
- ✅ **Animações Fluidas**: Transições suaves entre telas e elementos
- ✅ **Interface Responsiva**: Design adaptável para diferentes tamanhos de tela
- ✅ **Persistência Local**: Armazenamento de histórico no dispositivo
- ✅ **Feedback Visual**: Indicadores de progresso e estados de resposta

## 🛠️ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Expo CLI** global
- **Android Studio** (para Android) ou **Xcode** (para iOS)
- Dispositivo físico ou emulador configurado

### Instalação do Expo CLI
```bash
npm install -g @expo/cli
```

## ⚡ Como Executar o Projeto

### 1. **Clone o repositório**
```bash
git clone repo-projeto
cd desafio-mobile/desafioMobile
```

### 2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

### 3. **Execute no dispositivo/emulador**

#### **Android**
```bash
npx expo start
```

## 📱 Uso do Aplicativo

### **Fluxo Principal**

1. **Tela de Entrada**: Digite seu nome para inicializar
2. **Quiz**: Responda às perguntas selecionando uma das opções
3. **Progresso**: Acompanhe seu progresso na barra superior
4. **Resultados**: Visualize sua pontuação e desempenho
5. **Histórico**: Acesse tentativas anteriores com detalhes completos

### **Navegação**

- **Barra de Progresso**: Indica quantas perguntas foram respondidas
- **Botões de Ação**: Navegar entre perguntas e finalizar quiz
- **Histórico Expandível**: Toque nos itens para ver detalhes das respostas

## 🧪 Scripts Disponíveis

```bash

# Executar testes
npm test

# Lint do código
npm run lint

# Corrigir problemas de lint automaticamente
npm run lint:fix

# Verificar lint (CI/CD)
npm run lint:check
```

## 📂 Estrutura do Projeto

```
desafioMobile/
├── src/
│   └── app/
│       ├── _layout.tsx          # Layout principal
│       ├── sign-in.tsx          # Tela de entrada/login
│       ├── (quiz)/
│       │   ├── _layout.tsx      # Layout do quiz
│       │   └── quiz.tsx         # Tela principal do quiz
│       └── (results)/
│           ├── _layout.tsx      # Layout dos resultados
│           ├── results.tsx      # Tela de resultados
│           └── history.tsx      # Histórico de tentativas
├── components/
│   ├── Button.tsx               # Componente de botão reutilizável
│   ├── Confetti.tsx             # Efeito de confetti
│   ├── QuestionOption.tsx       # Opção de resposta
│   └── QuizProgress.tsx         # Barra de progresso
├── contexts/
│   └── QuizContext.tsx          # Context API para estado global
├── data/
│   └── questions.json           # Banco de dados das perguntas
├── types/
│   └── quiz.ts                  # Tipagens TypeScript
├── constants/
│   ├── Colors.ts                # Cores do tema
│   └── colors.js                # Paleta de cores
└── assets/
    ├── fonts/                   # Fontes customizadas
    └── images/                  # Imagens e ícones
```

## 🎨 Temas e Cores

O aplicativo utiliza uma paleta de cores moderna e acessível:

- **Primary**: Roxo (#A244E3)
- **Secondary**: Amarelo (#EAA907)
- **Success**: Verde (#10B981)
- **Error**: Vermelho (#EF4444)
- **Warning**: Amarelo (#F59E0B)

## 🔧 Configurações

### **Tailwind CSS**
O projeto utiliza NativeWind para estilização com classes do Tailwind CSS. As configurações estão em:
- `tailwind.config.js`
- `nativewind-env.d.ts`

### **TypeScript**
Configurações de TypeScript em:
- `tsconfig.json`
- `expo-env.d.ts`

### **ESLint**
Regras de linting configuradas em:
- `eslint.config.js`

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Desenvolvedor

**Gustavo Esteves**
- GitHub: [@gustavoaesteves](https://github.com/gustavoaesteves)
- LinkedIn: [Gustavo Esteves](https://linkedin.com/in/gustavoaesteves)
