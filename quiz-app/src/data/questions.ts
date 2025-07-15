import { Question } from "./question";

export const questions: Record<string, Question> = {
  q1: {
    id: "q1",
    text: "Quais frutas você gosta?",
    multiple: true,
    answers: [
      { text: "Maçã", next: "q2" },
      { text: "Banana", next: "q2" },
      { text: "Manga", next: "q2" },
      { text: "Melancia", next: "q2" },
    ],
  },
  q2: {
    id: "q2",
    text: "Você prefere frio ou calor?",
    multiple: false,
    answers: [
      { text: "Frio", next: "q3" },
      { text: "Calor", next: "q3" },
    ],
  },
  q3: {
    id: "q3",
    text: "Qual é seu tipo de música favorito?",
    multiple: false,
    answers: [
      { text: "Rock", next: "q4" },
      { text: "Pop", next: "q4" },
      { text: "MPB", next: "q4" },
      { text: "Eletrônica", next: "q4" },
    ],
  },
  q4: {
    id: "q4",
    text: "Você gosta de animais?",
    multiple: false,
    answers: [
      { text: "Sim", next: "q5" },
      { text: "Não", next: "q5" },
    ],
  },
  q5: {
    id: "q5",
    text: "Quais pets você gostaria de ter?",
    multiple: true,
    answers: [
      { text: "Cachorro", next: "q6" },
      { text: "Gato", next: "q6" },
      { text: "Pássaro", next: "q6" },
      { text: "Nenhum", next: "q6" },
    ],
  },
  q6: {
    id: "q6",
    text: "Qual seu hobby favorito?",
    multiple: false,
    answers: [
      { text: "Ler", next: "q7" },
      { text: "Cozinhar", next: "q7" },
      { text: "Esportes", next: "q7" },
      { text: "Jogos", next: "q7" },
    ],
  },
  q7: {
    id: "q7",
    text: "Você prefere ambientes calmos ou agitados?",
    multiple: false,
    answers: [
      { text: "Calmos", next: "q8" },
      { text: "Agitados", next: "q8" },
    ],
  },
  q8: {
    id: "q8",
    text: "Qual cor você mais gosta?",
    multiple: false,
    answers: [
      { text: "Azul", next: "q9" },
      { text: "Vermelho", next: "q9" },
      { text: "Verde", next: "q9" },
      { text: "Amarelo", next: "q9" },
    ],
  },
  q9: {
    id: "q9",
    text: "Você se considera mais introvertido ou extrovertido?",
    multiple: false,
    answers: [
      { text: "Introvertido", next: "q10" },
      { text: "Extrovertido", next: "q10" },
    ],
  },
  q10: {
    id: "q10",
    text: "Qual sua estação do ano favorita?",
    multiple: false,
    answers: [
      { text: "Verão", next: "resultA" },
      { text: "Inverno", next: "resultB" },
      { text: "Primavera", next: "resultC" },
      { text: "Outono", next: "resultD" },
    ],
  },
};
