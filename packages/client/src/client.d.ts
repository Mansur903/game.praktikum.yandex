declare const __SERVER_PORT__: number

interface YandexApp {
	app?: AuthData
}

declare interface Window {
	yandex: YandexApp
}

window.yandex = window.yandex || {}
