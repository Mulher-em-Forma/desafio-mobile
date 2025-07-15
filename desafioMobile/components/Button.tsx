import React from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'

type Props = TouchableOpacityProps & {
	title: string
	size?: ButtonSize
	variant?: ButtonVariant
	bgColor?: string
	textColor?: string
	customClasses?: string
}

const sizeClasses = {
	sm: 'px-3 py-2',
	md: 'px-4 py-3',
	lg: 'px-6 py-4',
	xl: 'px-8 py-5'
}

const textSizeClasses = {
	sm: 'text-sm',
	md: 'text-base',
	lg: 'text-lg',
	xl: 'text-xl'
}

const variantClasses = {
	primary: 'bg-primary active:bg-primary/80',
	secondary: 'bg-secondary active:bg-secondary/80',
	outline: 'bg-transparent border-2 border-primary active:bg-primary/10',
	ghost: 'bg-transparent active:bg-primary/10'
}

const variantTextClasses = {
	primary: 'text-white',
	secondary: 'text-white',
	outline: 'text-primary',
	ghost: 'text-primary'
}

// Função utilitária simples para combinar classes
function cn(...classes: (string | undefined)[]): string {
	return classes.filter(Boolean).join(' ')
}

export function Button({
	title,
	size = 'md',
	variant = 'primary',
	bgColor,
	textColor,
	customClasses,
	...rest
}: Props): React.JSX.Element {
	const baseClasses = 'rounded-lg items-center justify-center'
	const sizeClass = sizeClasses[size]
	const textSizeClass = textSizeClasses[size]

	// Se bgColor for fornecido, usa ele, senão usa o variant
	const backgroundClass = bgColor || variantClasses[variant]
	const textColorClass = textColor || variantTextClasses[variant]

	const containerClasses = cn(
		baseClasses,
		sizeClass,
		backgroundClass,
		customClasses
	)

	const textClasses = cn(
		'font-bold',
		textSizeClass,
		textColorClass
	)

	return (
		<TouchableOpacity
			className={containerClasses}
			activeOpacity={0.8}
			{...rest}
		>
			<Text className={textClasses}>{title}</Text>
		</TouchableOpacity>
	)
}
