import { router } from 'expo-router'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { AppColors } from '../../constants/Colors'
import { Button } from '../../components/Button'

export default function SignIn(): React.JSX.Element {
	function signIn(): void {
		router.navigate('/(quiz)/quiz')
	}

	return (
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
	)
}
