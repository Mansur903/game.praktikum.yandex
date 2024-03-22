import {callJsApi} from './utils'
import {AppError, AppErrorCode} from './error'
import {OAUTH_BASE_URL, OAUTH_REDIRECT_URI} from '../config/api'

enum YandexAuthErrorName {
	NotLoggedIn = 'AuthErrorCode::ERROR_NOT_LOGGED_IN'
}

type PSUIDPayload = {
	psuid: string
}

type JWTPayload = {
	iss: string
	iat: number
	jti: string
	exp: number
}

export type YandexAuthPSUIDInfo = {
	payload: JWTPayload & PSUIDPayload
	code: string
}

export async function jsApiIdentify(clientID: string): Promise<YandexAuthPSUIDInfo> {
	try {
		return await callJsApi({
			name: 'window.yandex.app.auth.identify',
			args: [clientID],
			scope: window.yandex?.app?.auth,
			method: 'identify'
		})
	} catch (err) {
		const {name} = err as typeof AppError

		if (name === YandexAuthErrorName.NotLoggedIn) {
			throw new AppError(AppErrorCode.JsApiCancelled, 'User not logged.')
		}

		throw err
	}
}

export function redirectToOauthAuthorize(clientID: string): void {
	const search = new URLSearchParams()

	search.append('client_id', clientID)
	search.append('redirect_uri', OAUTH_REDIRECT_URI)
	search.append('response_type', 'code')

	window.location.href = `${OAUTH_BASE_URL}?${search.toString()}`
}
