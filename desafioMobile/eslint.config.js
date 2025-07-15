import js from '@eslint/js'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactNative from 'eslint-plugin-react-native'
import importPlugin from 'eslint-plugin-import'

export default [
	js.configs.recommended,
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
				ecmaVersion: 2021,
				sourceType: 'module',
			},
			globals: {
				console: 'readonly',
				process: 'readonly',
				Buffer: 'readonly',
				__dirname: 'readonly',
				__filename: 'readonly',
			},
		},
		plugins: {
			'@typescript-eslint': typescript,
			react,
			'react-hooks': reactHooks,
			'react-native': reactNative,
			import: importPlugin,
		},
		rules: {
			// React rules
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
			'react/display-name': 'off',

			// React Hooks rules
			'react-hooks/exhaustive-deps': 'error',
			'react-hooks/rules-of-hooks': 'error',

			// TypeScript rules
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'error',
			'@typescript-eslint/no-explicit-any': 'error',

			// React Native specific
			'react-native/no-unused-styles': 'error',
			'react-native/split-platform-components': 'error',
			'react-native/no-inline-styles': 'warn',
			'react-native/no-raw-text': 'off',

			// Import rules
			'import/order': [
				'error',
				{
					groups: [
						'builtin',
						'external',
						'internal',
						'parent',
						'sibling',
						'index',
					],
					'newlines-between': 'always',
					alphabetize: { order: 'asc', caseInsensitive: true },
				},
			],

			// General rules
			'no-console': 'warn',
			'no-debugger': 'off',
			'prefer-const': 'error',
			'no-var': 'error',
			'object-shorthand': 'error',
			'prefer-arrow-callback': 'error',

			// Code style rules
			semi: ['error', 'never'],
			curly: ['error', 'multi-or-nest', 'consistent'],
			'nonblock-statement-body-position': ['error', 'beside'],
			'brace-style': ['error', '1tbs', { allowSingleLine: true }],
			'object-curly-spacing': ['error', 'always'],
			'array-bracket-spacing': ['error', 'never'],
			'comma-dangle': ['error', 'never'],
			'quote-props': ['error', 'as-needed'],
			quotes: ['error', 'single', { avoidEscape: true }],
			indent: ['error', 'tab'],
			'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
			'eol-last': ['error', 'always'],
			'no-trailing-spaces': 'error',
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
	{
		ignores: [
			'node_modules/',
			'.expo/',
			'dist/',
			'build/',
			'*.config.js',
			'metro.config.js',
			'babel.config.js',
			'jest.config.js',
			'.expo-shared/',
			'coverage/',
			'*.log',
			'.DS_Store',
			'android/',
			'ios/',
		],
	},
]
