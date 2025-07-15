import { z } from 'zod'

// Schema para validação das opções
export const OptionSchema = z.object({
	id: z.string(),
	text: z.string()
})

// Schema para validação das perguntas
export const QuestionSchema = z.object({
	id: z.number(),
	question: z.string(),
	options: z.array(OptionSchema),
	correctAnswer: z.string(),
	explanation: z.string()
})

// Schema para validação das respostas do usuário
export const UserAnswerSchema = z.object({
	questionId: z.number(),
	selectedAnswer: z.string(),
	isCorrect: z.boolean()
})

// Schema para validação do estado do quiz
export const QuizStateSchema = z.object({
	currentQuestionIndex: z.number(),
	answers: z.array(UserAnswerSchema),
	isCompleted: z.boolean()
})

// Tipos TypeScript inferidos dos schemas
export type Option = z.infer<typeof OptionSchema>
export type Question = z.infer<typeof QuestionSchema>
export type UserAnswer = z.infer<typeof UserAnswerSchema>
export type QuizState = z.infer<typeof QuizStateSchema>

// Tipos adicionais para o contexto
export interface QuizContextType {
	questions: Question[]
	currentQuestionIndex: number
	answers: UserAnswer[]
	isCompleted: boolean
	selectedAnswer: string | null
	isAnswerSelected: boolean
	loadQuestions: () => Promise<void>
	selectAnswer: (answerId: string) => void
	nextQuestion: () => void
	finishQuiz: () => void
	resetQuiz: () => void
	getScore: () => { correct: number; total: number }
}
