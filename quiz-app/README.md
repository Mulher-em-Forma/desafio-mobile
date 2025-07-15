# 📱 Quiz App Interativo – React Native + Expo Router

Este projeto é um app de quiz interativo desenvolvido com **React Native** usando **Expo** e **expo-router**, onde cada resposta leva a uma próxima pergunta diferente. Ao final, o app exibe um resumo das respostas.

---

## 🚀 Tecnologias Utilizadas

- **Expo** – ambiente de desenvolvimento
- **React Native** com **TypeScript**
- **expo-router** – navegação baseada em arquivos
- **Zustand** – gerenciamento de estado global
- **react-native-reanimated** – animações suaves entre perguntas

---

## ✅ Funcionalidades

- Navegação condicional entre perguntas com base nas respostas
- Suporte a perguntas com **múltiplas escolhas**
- Armazenamento e exibição das respostas do usuário
- Transições animadas entre telas
- Layout simples, agradável e responsivo

---

## ▶️ Como Rodar o Projeto

### 1. Pré-requisitos

- Node.js v22+

### 2. Instalação e execução

```bash
npm install
npx expo start --tunnel
```

Abra com:

- **Expo Go** no celular:
  - 📱 [Download para Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
  - 📱 [Download para iOS](https://apps.apple.com/app/expo-go/id982107779)
- Ou em emulador Android/iOS

---

## 🧠 Estrutura do Quiz

- As perguntas estão em `data/questions.ts`
- Cada pergunta possui:
  - `id`, `text`, `multiple` e `answers`
- Cada `answer` leva a uma próxima pergunta (`next`)
- Após a última (`q10`), o app redireciona para a tela `/result`

---

## 📷 Visual do App

- Transições animadas com `react-native-reanimated`
- Componente `AnimatedQuestion` exibe perguntas de forma dinâmica
- Componente `MultipleChoiceList` permite múltiplas seleções
- Tela final lista todas as respostas e oferece opção de reinício

---

## 📝 Licença

Este projeto foi criado como parte de um desafio técnico. Livre para estudos e adaptações.
