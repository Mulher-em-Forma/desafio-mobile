import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, View, ScrollView } from 'react-native'
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated'

import { Button } from '../../../components/Button'
import { Confetti } from '../../../components/Confetti'
import { QuestionOption } from '../../../components/QuestionOption'
import { QuizProgress } from '../../../components/QuizProgress'
import { AppColors } from '../../../constants/Colors'
import { useQuiz } from '../../../contexts/QuizContext'

export default function Quiz(): React.JSX.Element {
	const {
		questions,
		currentQuestionIndex,
		selectedAnswer,
		isAnswerSelected,
		isCompleted,
		loadQuestions,
		selectAnswer,
		nextQuestion
	} = useQuiz()

	const [showConfetti, setShowConfetti] = useState(false)

	useEffect(() => {
		loadQuestions()
	}, [loadQuestions])

	useEffect(() => {
		if (isCompleted) setShowConfetti(true)
	}, [isCompleted])

	const handleNextQuestion = (): void => {
		nextQuestion()
	}

	const handleGoToResults = (): void => {
		router.push('/(results)/results')
	}

	const currentQuestion = questions[currentQuestionIndex]

	if (questions.length === 0) {
		return (
			<SafeAreaView className="flex-1 bg-white">
				<View className="flex-1 justify-center items-center">
					<Text className="text-lg text-gray-600">Carregando perguntas...</Text>
				</View>
			</SafeAreaView>
		)
	}

	if (isCompleted) {
		return (
			<SafeAreaView className="flex-1 bg-white">
				<LinearGradient
					colors={[AppColors.primary, AppColors.secondary]}
					className="flex-1 justify-center items-center px-6 py-8"
				>
					<Confetti start={showConfetti} />
					<Animated.View
						entering={FadeInDown.delay(500)}
						className="items-center"
					>
						<Text className="text-white text-3xl font-bold text-center mb-4">
							🎉 Parabéns! 🎉
						</Text>
						<Text className="text-white text-xl text-center mb-8">
							Você completou o quiz!
						</Text>
						<Button
							title="Ver Resultados"
							onPress={handleGoToResults}
							variant="secondary"
							size="lg"
							customClasses="rounded-xl"
						/>
					</Animated.View>
				</LinearGradient>
			</SafeAreaView>
		)
	}

	return (
		<SafeAreaView className="flex-1 bg-white">
			<LinearGradient
				colors={[AppColors.primary, AppColors.secondary]}
				className="flex-1"
			>
				<ScrollView
					className="flex-1 px-4 pt-6"
					showsVerticalScrollIndicator={false}
					contentContainerClassName="pb-8"
				>
					<QuizProgress
						currentQuestion={currentQuestionIndex}
						totalQuestions={questions.length}
					/>

					<Animated.View
						key={currentQuestion.id}
						entering={FadeInDown.duration(500)}
						exiting={FadeOutUp.duration(300)}
						className="bg-white rounded-2xl p-6 shadow-sm mb-6"
					>
						<Text className="text-2xl font-bold text-gray-800 mb-6 leading-8">
							{currentQuestion.question}
						</Text>

						<View className="space-y-3">
							{currentQuestion.options.map((option) => (
								<QuestionOption
									key={option.id}
									option={option}
									isSelected={selectedAnswer === option.id}
									onSelect={selectAnswer}
								/>
							))}
						</View>
					</Animated.View>

					<Animated.View
						entering={FadeInDown.delay(200)}
						className="mt-4"
					>
						<Button
							title={
								currentQuestionIndex === questions.length - 1
									? 'Finalizar Quiz'
									: 'Próxima Pergunta'
							}
							onPress={handleNextQuestion}
							disabled={!isAnswerSelected}
							variant="primary"
							size="lg"
							customClasses={`rounded-xl ${!isAnswerSelected ? 'opacity-50' : ''}`}
						/>
					</Animated.View>
				</ScrollView>
			</LinearGradient>
		</SafeAreaView>
	)
}
