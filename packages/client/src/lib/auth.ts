import {callJsApi} from './utils'
import {AppError, AppErrorCode} from './error'

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
	jwtToken: string
}

export async function jsApiIdentify(clientID: string): Promise<YandexAuthPSUIDInfo> {
	try {
		return await callJsApi({
			name: 'window.yandex.app.auth.identify',
			args: [clientID],
			scope: window?.yandex?.app?.auth,
			method: 'identify'
		})
	} catch (err) {
		// @ts-ignore
		const {name} = err

		if (name === YandexAuthErrorName.NotLoggedIn) {
			throw new AppError(AppErrorCode.JsApiCancelled, 'User not logged.')
		}

		throw err
	}
}

export function redirectToOauthAuthorize(clientID: string): void {
	const search = new URLSearchParams()

	search.append('client_id', clientID)
	search.append('redirect_uri', 'http://localhost:3000')
	search.append('response_type', 'code')

	window.location.href = `https://oauth.yandex.ru/authorize?${search.toString()}`
}
