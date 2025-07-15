import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { router, useFocusEffect } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { SafeAreaView, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'

import { Button } from '../../../components/Button'
import { useQuiz } from '../../../contexts/QuizContext'

import { AppColors } from '@/constants/colors'

interface ExpandedItem {
	[key: string]: boolean
}

export default function History(): React.JSX.Element {
	const { history, loadHistory } = useQuiz()
	const [expandedItems, setExpandedItems] = useState<ExpandedItem>({})

	useFocusEffect(
		useCallback(() => {
			loadHistory()
		}, [loadHistory])
	)

	const toggleExpanded = (id: string): void => {
		setExpandedItems(prev => ({
			...prev,
			[id]: !prev[id]
		}))
	}

	const formatDate = (dateString: string): string => {
		const date = new Date(dateString)
		return date.toLocaleDateString('pt-BR', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		})
	}

	const getScoreColor = (percentage: number): string => {
		if (percentage >= 60) return 'text-green-600'
		return 'text-red-600'
	}

	const getScoreMessage = (percentage: number): string => {
		if (percentage >= 80) return '🏆 Excelente!'
		if (percentage >= 60) return '👏 Muito bem!'
		if (percentage >= 40) return '👍 Bom trabalho!'
		return '💪 Continue tentando!'
	}

	const handleRetakeQuiz = (): void => {
		Alert.alert(
			'Novo Quiz',
			'Deseja iniciar um novo quiz?',
			[
				{
					text: 'Cancelar',
					style: 'cancel'
				},
				{
					text: 'Sim',
					onPress: () => router.push('/(quiz)/quiz')
				}
			]
		)
	}

	if (history.length === 0) {
		return (
			<SafeAreaView className="flex-1 bg-white">
				<LinearGradient
					colors={[AppColors.primary, AppColors.secondary]}
					className="flex-1 justify-center items-center px-6"
				>
					<Ionicons name="document-text-outline" size={80} color="white" />
					<Text className="text-xl font-semibold text-white mt-4 text-center">
						Nenhum histórico encontrado
					</Text>
					<Text className="text-muted mt-2 text-center">
						Complete um quiz para ver seus resultados aqui
					</Text>
					<Button
						title="Fazer Primeiro Quiz"
						onPress={() => router.push('/sign-in')}
						variant="secondary"
						size="lg"
						customClasses="rounded-xl mt-6"
					/>
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
					<Animated.View
						entering={FadeInDown.duration(500)}
						className="mb-6"
					>
						<Text className="text-2xl font-bold text-white mb-2">
							Histórico de Quizzes
						</Text>
						<Text className="text-muted">
							{history.length} {history.length === 1 ? 'tentativa' : 'tentativas'} realizadas
						</Text>
					</Animated.View>

					<View className="space-y-4">
						{history.map((item, index) => (
							<Animated.View
								key={item.id}
								entering={FadeInDown.delay(index * 100)}
								className="bg-white rounded-xl shadow-sm border border-gray-100 mb-3"
							>
								<TouchableOpacity
									onPress={() => toggleExpanded(item.id)}
									className="p-5"
								>
									<View className="flex-row justify-between items-start mb-3">
										<View className="flex-1">
											<View className="flex-row items-center mb-2">
												<Text className="text-lg font-semibold text-gray-800">
													Tentativa #{history.length - index}
												</Text>
												<View className={`ml-2 px-2 py-1 rounded-full ${
													item.score.percentage >= 60 ? 'bg-green-100' : 'bg-red-100'
												}`}>
													<Text className={`text-xs font-medium ${
														item.score.percentage >= 60 ? AppColors.success : AppColors.error
													}`}>
														{item.score.percentage}%
													</Text>
												</View>
											</View>
											<Text className="text-sm text-gray-500">
												{formatDate(item.date)}
											</Text>
										</View>
										<Ionicons
											name={expandedItems[item.id] ? 'chevron-up' : 'chevron-down'}
											size={24}
											color="#6b7280"
										/>
									</View>

									<View className="flex-row items-center justify-between">
										<View>
											<Text className={`text-2xl font-bold ${getScoreColor(item.score.percentage)}`}>
												{item.score.correct}/{item.score.total}
											</Text>
											<Text className="text-sm text-gray-600">
												{getScoreMessage(item.score.percentage)}
											</Text>
										</View>
										<View className="w-16 h-16 rounded-full items-center justify-center border-4"
											style={{
												borderColor: item.score.percentage >= 60 ? AppColors.success : AppColors.error
											}}
										>
											<Text className={`text-lg font-bold ${getScoreColor(item.score.percentage)}`}>
												{item.score.percentage}%
											</Text>
										</View>
									</View>
								</TouchableOpacity>

								{expandedItems[item.id] && (
									<Animated.View
										entering={FadeInDown.duration(300)}
										className="px-5 pb-5 border-t border-gray-100"
									>
										<Text className="text-sm font-medium text-gray-700 mb-3 mt-3">
											Detalhes das Questões:
										</Text>

										{item.questions.map((question, qIndex) => {
											const userAnswer = item.answers.find(a => a.questionId === question.id)
											const userOption = question.options.find(o => o.id === userAnswer?.selectedAnswer)
											const correctOption = question.options.find(o => o.id === question.correctAnswer)
											const isCorrect = userAnswer?.isCorrect

											return (
												<View
													key={question.id}
													className="mb-3 p-3 rounded-lg bg-gray-50"
												>
													<View className="flex-row items-start mb-2">
														<Text className="text-sm font-medium text-gray-800 flex-1 pr-3">
															{qIndex + 1}. {question.question}
														</Text>
														<View className={`w-6 h-6 rounded-full items-center justify-center ${
															isCorrect ? 'bg-green-500' : 'bg-red-500'
														}`}>
															<Text className="text-white text-xs font-bold">
																{isCorrect ? '✓' : '✗'}
															</Text>
														</View>
													</View>

													<View className="space-y-2">
														<View>
															<Text className="text-xs text-gray-500 mb-1">Sua resposta:</Text>
															<Text className={`text-sm font-medium ${
																isCorrect ? 'text-green-700' : 'text-red-700'
															}`}>
																{userOption?.text || 'Não respondida'}
															</Text>
														</View>

														{!isCorrect && (
															<View>
																<Text className="text-xs text-gray-500 mb-1">Resposta correta:</Text>
																<Text className="text-sm font-medium text-green-700">
																	{correctOption?.text}
																</Text>
															</View>
														)}
													</View>
												</View>
											)
										})}
									</Animated.View>
								)}
							</Animated.View>
						))}
					</View>

					<Animated.View
						entering={FadeInDown.delay(400)}
						className="mt-8"
					>
						<Button
							title="Iniciar Novo Quiz"
							onPress={handleRetakeQuiz}
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
