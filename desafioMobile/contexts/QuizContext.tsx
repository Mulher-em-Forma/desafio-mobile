import * as FileSystem from 'expo-file-system'
import React, { createContext, useContext, useState, useCallback } from 'react'

import questionsData from '../data/questions.json'
import { Question, QuizContextType, UserAnswer, UserAnswerSchema, QuizHistory, QuizHistoryItem } from '../types/quiz'

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
	const [history, setHistory] = useState<QuizHistory>([])
	const [hasSavedCurrentQuiz, setHasSavedCurrentQuiz] = useState(false)

	const historyFilePath = `${FileSystem.documentDirectory}quiz_history.json`

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
		setHasSavedCurrentQuiz(false)
	}, [])

	const getScore = useCallback((): { correct: number; total: number } => {
		const correct = answers.filter(answer => answer.isCorrect).length
		return { correct, total: questions.length }
	}, [answers, questions.length])

	const loadHistory = useCallback(async (): Promise<void> => {
		try {
			const fileExists = await FileSystem.getInfoAsync(historyFilePath)
			if (fileExists.exists) {
				const historyContent = await FileSystem.readAsStringAsync(historyFilePath)
				const parsedHistory = JSON.parse(historyContent) as QuizHistory
				setHistory(parsedHistory)
			}
		} catch {
			// Erro ao carregar histórico - usando array vazio
			setHistory([])
		}
	}, [historyFilePath])

	const saveToHistory = useCallback(async (): Promise<void> => {
		// Evitar salvamentos duplicados
		if (hasSavedCurrentQuiz) return

		try {
			const { correct, total } = getScore()
			const percentage = Math.round((correct / total) * 100)

			const historyItem: QuizHistoryItem = {
				id: Date.now().toString(),
				date: new Date().toISOString(),
				score: {
					correct,
					total,
					percentage
				},
				answers,
				questions
			}

			// Carregar histórico atual do arquivo
			let currentHistory: QuizHistory = []
			try {
				const fileExists = await FileSystem.getInfoAsync(historyFilePath)
				if (fileExists.exists) {
					const historyContent = await FileSystem.readAsStringAsync(historyFilePath)
					currentHistory = JSON.parse(historyContent) as QuizHistory
				}
			} catch {
				// Se der erro ao ler, usa array vazio
				currentHistory = []
			}

			const updatedHistory = [historyItem, ...currentHistory]
			await FileSystem.writeAsStringAsync(
				historyFilePath,
				JSON.stringify(updatedHistory, null, 2)
			)
			setHistory(updatedHistory)
			setHasSavedCurrentQuiz(true)
		} catch {
			// Erro ao salvar histórico - continuando silenciosamente
		}
	}, [getScore, answers, questions, hasSavedCurrentQuiz, historyFilePath])

	const value: QuizContextType = {
		questions,
		currentQuestionIndex,
		answers,
		isCompleted,
		selectedAnswer,
		isAnswerSelected: selectedAnswer !== null,
		history,
		loadQuestions,
		selectAnswer,
		nextQuestion,
		finishQuiz,
		resetQuiz,
		getScore,
		saveToHistory,
		loadHistory
	}

	return (
		<QuizContext.Provider value={value}>
			{children}
		</QuizContext.Provider>
	)
}
