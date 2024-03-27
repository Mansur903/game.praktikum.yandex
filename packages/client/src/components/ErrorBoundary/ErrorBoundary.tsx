import React, {Component, ErrorInfo, ReactNode} from 'react'
import styles from './ErrorBoundary.module.scss'
type PropsType = {
	fallback?: () => ReactNode
	children: ReactNode
}
type StateType = {
	isError: string
}
class ErrorBoundary extends Component<PropsType, StateType> {
	constructor(props: PropsType) {
		super(props)
		this.state = {isError: ''}
	}

	static getDerivedStateFromError(error: Error) {
		return {isError: error}
	}

	componentDidCatch(error: Error, info: ErrorInfo) {
		console.error(error, info.componentStack)
	}

	render() {
		const {children, fallback} = this.props
		if (this.state.isError) {
			return fallback ? (
				fallback()
			) : (
				<div className={styles['error-container']}>
					<h1>Кажется возникла ошибка:(</h1>
					<span>{this.state.isError}</span>
					<h1>Попробуйте снова</h1>
				</div>
			)
		}

		return children
	}
}

export {ErrorBoundary}
