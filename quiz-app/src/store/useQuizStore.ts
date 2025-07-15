import { create } from "zustand";

type AnswerEntry = {
  questionId: string;
  answer: string | string[];
};

type QuizStore = {
  currentQuestionId: string;
  answers: AnswerEntry[];
  setCurrentQuestion: (id: string) => void;
  addAnswer: (entry: AnswerEntry) => void;
  resetQuiz: () => void;
};

export const useQuizStore = create<QuizStore>((set) => ({
  currentQuestionId: "q1",
  answers: [],
  setCurrentQuestion: (id) => set({ currentQuestionId: id }),
  addAnswer: (entry) =>
    set((state) => ({
      answers: [...state.answers, entry],
    })),
  resetQuiz: () =>
    set({
      currentQuestionId: "q1",
      answers: [],
    }),
}));