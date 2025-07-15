import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'

interface QuizProgressProps {
	currentQuestion: number
	totalQuestions: number
}

export function QuizProgress({ currentQuestion, totalQuestions }: QuizProgressProps): React.JSX.Element {
	const progress = useSharedValue(0)

	useEffect(() => {
		progress.value = withTiming((currentQuestion + 1) / totalQuestions, { duration: 500 })
	}, [currentQuestion, totalQuestions, progress])

	const animatedStyle = useAnimatedStyle(() => ({
		width: `${progress.value * 100}%`
	}))

	return (
		<View className="w-full mb-8">
			<View className="flex-row justify-between items-center mb-3">
				<Text className="text-secondary font-semibold text-base">
					Pergunta {currentQuestion + 1} de {totalQuestions}
				</Text>
				<View className="bg-white px-3 py-1 rounded-full">
					<Text className="text-secondary font-bold text-sm">
						{Math.round(((currentQuestion + 1) / totalQuestions) * 100)}%
					</Text>
				</View>
			</View>

			<View className="w-full h-3 bg-muted rounded-full overflow-hidden shadow-inner">
				<Animated.View
					style={animatedStyle}
					className="h-full bg-gradient-to-r from-primary to-secondary rounded-full shadow-sm"
				/>
			</View>
		</View>
	)
}
