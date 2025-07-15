import React, { useEffect, useRef } from 'react'
import { View } from 'react-native'
import ConfettiCannon from 'react-native-confetti-cannon'

interface ConfettiProps {
	start: boolean
}

export function Confetti({ start }: ConfettiProps): React.JSX.Element {
	const confettiRef = useRef<ConfettiCannon>(null)

	useEffect(() => {
		if (start && confettiRef.current) confettiRef.current.start()
	}, [start])

	if (!start) return <View />

	return (
		<ConfettiCannon
			ref={confettiRef}
			count={200}
			origin={{ x: -10, y: 0 }}
			autoStart={false}
			fadeOut={true}
			explosionSpeed={350}
			fallSpeed={2500}
			colors={['#A244E3', '#EAA907', '#F97316', '#17B169', '#2970FE']}
		/>
	)
}
