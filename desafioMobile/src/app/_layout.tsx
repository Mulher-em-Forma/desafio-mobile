import { Stack } from 'expo-router'
import React from 'react'

import '../../global.css'
import { QuizProvider } from '../../contexts/QuizContext'

export default function Layout(): React.JSX.Element {
	return (
		<QuizProvider>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="sign-in" />
				<Stack.Screen name="(quiz)" />
				<Stack.Screen name="results" />
			</Stack>
		</QuizProvider>
	)
}
