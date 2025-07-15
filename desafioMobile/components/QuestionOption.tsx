import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withSpring,
	runOnJS
} from 'react-native-reanimated'

import { Option } from '../types/quiz'

interface QuestionOptionProps {
	option: Option
	isSelected: boolean
	// eslint-disable-next-line no-unused-vars
	onSelect: (id: string) => void
	disabled?: boolean
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

export function QuestionOption({
	option,
	isSelected,
	onSelect,
	disabled = false
}: QuestionOptionProps): React.JSX.Element {
	const scale = useSharedValue(1)
	const opacity = useSharedValue(1)

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
		opacity: opacity.value
	}))

	const handlePress = (): void => {
		if (disabled) return

		scale.value = withSpring(0.95, { duration: 100 }, () => {
			scale.value = withSpring(1, { duration: 100 })
		})

		runOnJS(onSelect)(option.id)
	}

	const baseClasses = 'p-5 mb-4 rounded-xl border-2 shadow-sm'
	const selectedClasses = isSelected
		? 'bg-primary border-primary shadow-md'
		: 'bg-white border-gray-200 hover:border-gray-300'

	const textClasses = isSelected
		? 'text-white font-semibold'
		: 'text-gray-800 font-medium'

	return (
		<AnimatedTouchableOpacity
			style={animatedStyle}
			className={`${baseClasses} ${selectedClasses} ${disabled ? 'opacity-60' : ''}`}
			onPress={handlePress}
			disabled={disabled}
			activeOpacity={0.8}
		>
			<View className="flex-row items-center">
				<View className={`w-5 h-5 rounded-full border-2 mr-3 ${
					isSelected
						? 'bg-white border-white'
						: 'border-gray-300'
				}`}>
					{isSelected && (
						<View className="w-3 h-3 bg-primary rounded-full m-auto" />
					)}
				</View>
				<Text className={`${textClasses} text-base flex-1 leading-6`}>
					{option.text}
				</Text>
			</View>
		</AnimatedTouchableOpacity>
	)
}
