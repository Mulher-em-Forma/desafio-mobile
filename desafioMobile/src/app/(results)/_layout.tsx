import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'

export default function ResultsLayout(): React.JSX.Element {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: '#22c55e',
				tabBarInactiveTintColor: '#6b7280',
				tabBarStyle: {
					backgroundColor: 'white',
					borderTopWidth: 1,
					borderTopColor: '#e5e7eb',
					paddingBottom: 8,
					paddingTop: 8,
					height: 70
				},
				tabBarLabelStyle: {
					fontSize: 12,
					fontWeight: '500'
				}
			}}
		>
			<Tabs.Screen
				name="results"
				options={{
					title: 'Resultados',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="trophy-outline" size={size} color={color} />
					)
				}}
			/>
			<Tabs.Screen
				name="history"
				options={{
					title: 'Histórico',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="time-outline" size={size} color={color} />
					)
				}}
			/>
		</Tabs>
	)
}
