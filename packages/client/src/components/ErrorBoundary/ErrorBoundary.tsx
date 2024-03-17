import React, {Component, ErrorInfo, ReactNode} from 'react'
import styles from './ErrorBoundary.module.scss'
type PropsType = {
	fallback?: () => ReactNode
	children: ReactNode
}
type StateType = {
	hasError: boolean
}
class ErrorBoundary extends Component<PropsType, StateType> {
	constructor(props: PropsType) {
		super(props)
		this.state = {hasError: false}
	}

	static getDerivedStateFromError() {
		// Update state so the next render will show the fallback UI.
		return {hasError: true}
	}

	componentDidCatch(error: Error, info: ErrorInfo) {
		// Example "componentStack":
		//   in ComponentThatThrows (created by App)
		//   in ErrorBoundary (created by App)
		//   in div (created by App)
		//   in App
		console.error(error, info.componentStack)
	}

	render() {
		const {children, fallback} = this.props
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return fallback ? (
				fallback()
			) : (
				<div className={styles['error-container']}>
					<h1>Кажется возникла ошибка:(</h1>
					<h1>Попробуйте снова</h1>
				</div>
			)
		}

		return children
	}
}

export {ErrorBoundary}
