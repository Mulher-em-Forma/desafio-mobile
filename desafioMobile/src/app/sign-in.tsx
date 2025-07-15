import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native'

import { Button } from '../../components/Button'
import { AppColors } from '../../constants/Colors'
import { useQuiz } from '../../contexts/QuizContext'

export default function SignIn(): React.JSX.Element {
	const { resetQuiz } = useQuiz()

	useEffect(() => {
		resetQuiz()
	}, [resetQuiz])

	function signIn(): void {
		router.navigate('/(quiz)/quiz')
	}

	return (
		<SafeAreaView className="flex-1">
			<LinearGradient
				colors={[AppColors.primary, AppColors.secondary]}
				start={{ x: 0, y: 0.7 }}
				end={{ x: 1, y: 0.3 }}
				className="flex-1 justify-center items-center p-4"
			>
				<Button
					title="Acessar Quiz"
					onPress={signIn}
					variant="primary"
					size="xl"
					customClasses="rounded-xl"
				/>
			</LinearGradient>
		</SafeAreaView>
	)
}
