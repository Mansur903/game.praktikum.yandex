export enum AppErrorCode {
	JsApiCancelled = 'js_api_cancelled',
	JsApiMethodNotAvailable = 'js_api_method_not_available'
}

export class AppError extends Error {
	public code: AppErrorCode

	constructor(code: AppErrorCode, message: string) {
		super(message)

		this.code = code
		this.name = 'AppError'
	}
}
