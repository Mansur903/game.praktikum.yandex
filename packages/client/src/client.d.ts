declare const __SERVER_PORT__: number
declare const __EXTERNAL_SERVER_URL__: string
declare const __INTERNAL_SERVER_URL__: string

interface YandexApp {
	app?: AuthData
}

declare interface Window {
	yandex: YandexApp
}

window.yandex = window.yandex || {}
