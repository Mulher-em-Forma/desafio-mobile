import React, { createContext, useContext, useState, useCallback } from 'react'

import questionsData from '../data/questions.json'
import { Question, QuizContextType, UserAnswer, UserAnswerSchema } from '../types/quiz'

const QuizContext = createContext<QuizContextType | undefined>(undefined)

export function useQuiz(): QuizContextType {
	const context = useContext(QuizContext)
	if (!context) throw new Error('useQuiz must be used within a QuizProvider')

	return context
}

interface QuizProviderProps {
	children: React.ReactNode
}

export function QuizProvider({ children }: QuizProviderProps): React.JSX.Element {
	const [questions, setQuestions] = useState<Question[]>([])
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
	const [answers, setAnswers] = useState<UserAnswer[]>([])
	const [isCompleted, setIsCompleted] = useState(false)
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

	const loadQuestions = useCallback(async (): Promise<void> => {
		try {
			setQuestions(questionsData as Question[])
		} catch {
			setQuestions([])
		}
	}, [])

	const selectAnswer = useCallback((answerId: string): void => {
		setSelectedAnswer(answerId)
	}, [])

	const finishQuiz = useCallback((): void => {
		setIsCompleted(true)
	}, [])

	const nextQuestion = useCallback((): void => {
		if (selectedAnswer === null) return

		const currentQuestion = questions[currentQuestionIndex]
		const isCorrect = selectedAnswer === currentQuestion.correctAnswer

		const userAnswer = UserAnswerSchema.parse({
			questionId: currentQuestion.id,
			selectedAnswer,
			isCorrect
		})

		setAnswers(prev => [...prev, userAnswer])
		setSelectedAnswer(null)

		if (currentQuestionIndex < questions.length - 1) setCurrentQuestionIndex(prev => prev + 1)
		else finishQuiz()
	}, [selectedAnswer, questions, currentQuestionIndex, finishQuiz])

	const resetQuiz = useCallback((): void => {
		setCurrentQuestionIndex(0)
		setAnswers([])
		setIsCompleted(false)
		setSelectedAnswer(null)
	}, [])

	const getScore = useCallback((): { correct: number; total: number } => {
		const correct = answers.filter(answer => answer.isCorrect).length
		return { correct, total: questions.length }
	}, [answers, questions.length])

	const value: QuizContextType = {
		questions,
		currentQuestionIndex,
		answers,
		isCompleted,
		selectedAnswer,
		isAnswerSelected: selectedAnswer !== null,
		loadQuestions,
		selectAnswer,
		nextQuestion,
		finishQuiz,
		resetQuiz,
		getScore
	}

	return (
		<QuizContext.Provider value={value}>
			{children}
		</QuizContext.Provider>
	)
}
