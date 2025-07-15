import { Stack } from 'expo-router'
import React from 'react'
import '../../global.css'

export default function Layout(): React.JSX.Element {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="sign-in" />
        </Stack>
	)
}
