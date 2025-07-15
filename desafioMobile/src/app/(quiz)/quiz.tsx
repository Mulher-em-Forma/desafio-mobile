import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'

export default function Quiz(): React.JSX.Element {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<Text>Quiz Screen</Text>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	content: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})
