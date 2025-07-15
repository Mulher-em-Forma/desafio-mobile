import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React, { useEffect } from 'react'
import { SafeAreaView, Text, View, ScrollView, ColorValue } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'

import { Button } from '../../../components/Button'
import { useQuiz } from '../../../contexts/QuizContext'

import { AppColors } from '@/constants/colors'

export default function Results(): React.JSX.Element {
	const { questions, answers, getScore, saveToHistory } = useQuiz()
	const { correct, total } = getScore()
	const percentage = Math.round((correct / total) * 100)

	// Salvar no histórico quando a tela carregar (apenas uma vez)
	useEffect(() => {
		if (questions.length > 0 && answers.length > 0) saveToHistory()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []) // Dependências vazias intencionalmente para executar apenas uma vez

	const handleRestart = (): void => {
		router.push('/sign-in')
	}

	const getScoreMessage = (): string => {
		if (percentage >= 80) return '🏆 Excelente!'
		if (percentage >= 60) return '👏 Muito bem!'
		if (percentage >= 40) return '👍 Bom trabalho!'
		return '💪 Continue tentando!'
	}

	const getScoreColor = (): string => {
		if (percentage >= 60) return 'text-green-600'
		return 'text-red-600'
	}

	const getGradientColors = (): readonly [ColorValue, ColorValue, ...ColorValue[]] => {
		if (percentage === 100) {
			return [AppColors.success, AppColors.success]
		} else if (percentage === 0) {
			return [AppColors.error, AppColors.error]
		} else {
			return [
				AppColors.success,
				AppColors.error
			]
		}
	}

	const getGradientPositions = (): { start: { x: number; y: number }; end: { x: number; y: number } } => {
		if (percentage === 100) {
			return {
				start: { x: 1, y: 0 },
				end: { x: 1, y: 1 }
			}
		} else if (percentage === 0) {
			return {
				start: { x: 0, y: 1 },
				end: { x: 0, y: 1 }
			}
		} else {
			const greenRatio = percentage / 100
			return {
				start: { x: 0, y: 0 },
				end: { x: 0, y: 0.4 + greenRatio }
			}
		}
	}

	return (
		<SafeAreaView className="flex-1 bg-white">
			<LinearGradient
				colors={getGradientColors()}
				start={getGradientPositions().start}
				end={getGradientPositions().end}
				className="flex-1"
			>
				<ScrollView
					className="flex-1 px-4 pt-6"
					showsVerticalScrollIndicator={false}
					contentContainerClassName="pb-8"
				>
					<Animated.View
						entering={FadeInDown.duration(500)}
						className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-6 items-center border border-white/20"
					>
						<Text className="text-3xl font-bold text-gray-800 mb-2">
							Resultados do Quiz
						</Text>

						<View className="items-center mb-4">
							<Text className={`text-6xl font-bold ${getScoreColor()} mb-2`}>
								{percentage}%
							</Text>
							<Text className="text-xl font-semibold text-gray-700 mb-2">
								{correct} de {total} corretas
							</Text>
							<Text className="text-lg text-gray-600">
								{getScoreMessage()}
							</Text>
						</View>

						<View className="w-full bg-gray-200 rounded-full h-3 mb-4">
							<View
								className={`h-3 rounded-full ${
									percentage >= 60 ? 'bg-green-500' : 'bg-red-500'
								}`}
								style={{ width: `${percentage}%` }}
							/>
						</View>
					</Animated.View>

					<Animated.View
						entering={FadeInDown.delay(200)}
						className="space-y-6"
					>
						{questions.map((question, index) => {
							const userAnswer = answers.find(a => a.questionId === question.id)
							const userOption = question.options.find(o => o.id === userAnswer?.selectedAnswer)
							const correctOption = question.options.find(o => o.id === question.correctAnswer)
							const isCorrect = userAnswer?.isCorrect

							return (
								<View
									key={question.id}
									className="bg-white/95 backdrop-blur-sm rounded-xl p-5 mb-3 shadow-lg border border-white/20"
								>
									<View className="flex-row items-start mb-4">
										<Text className="text-lg font-semibold text-gray-800 flex-1 leading-6 pr-3">
											{index + 1}. {question.question}
										</Text>
										<View className={`w-8 h-8 rounded-full items-center justify-center mt-1 ${
											isCorrect ? 'bg-success' : 'bg-error'
										}`}>
											<Text className="text-white text-sm font-bold">
												{isCorrect ? '✓' : '✗'}
											</Text>
										</View>
									</View>

									<View className="flex gap-2">
										<View className={`p-4 rounded-lg ${
											isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
										}`}>
											<Text className="text-sm font-medium text-gray-600 mb-2">
												Sua resposta:
											</Text>
											<Text className={`font-semibold ${
												isCorrect ? 'text-green-700' : 'text-red-700'
											}`}>
												{userOption?.text || 'Não respondida'}
											</Text>
										</View>

										{!isCorrect && (
											<View className="p-4 rounded-lg bg-green-50 border border-green-200">
												<Text className="text-sm font-medium text-gray-600 mb-2">
													Resposta correta:
												</Text>
												<Text className="font-semibold text-green-700 mb-3">
													{correctOption?.text}
												</Text>
												<View className="pt-2 border-t border-green-200">
													<Text className="text-sm text-gray-600 italic leading-5">
														💡 {question.explanation}
													</Text>
												</View>
											</View>
										)}
									</View>
								</View>
							)
						})}
					</Animated.View>

					<Animated.View
						entering={FadeInDown.delay(400)}
						className="my-8 space-y-4"
					>
						<Button
							title="Iniciar Novo Quiz"
							onPress={handleRestart}
							variant="primary"
							size="lg"
							customClasses="rounded-xl"
						/>
					</Animated.View>
				</ScrollView>
			</LinearGradient>
		</SafeAreaView>
	)
}
