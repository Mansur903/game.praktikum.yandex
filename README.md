## Flappy Progger <img alt='player image' src='packages/client/src/assets/game/bird/b0.png'/> &middot; [![node version][nodejs-logo]][nodejs]

Аналог игры Flappy Bird

### Ссылки
[![Figma][figma-logo]][figma]
[![Видео][video_logo]][video]
### Используемые технологии
[![Typescript][ts_logo]][ts]
[![SASS][sass-logo]][sass]
[![Vite][vite-logo]][vite]
[![ESLint][eslint-logo]][eslint]
[![Prettier][prettier-logo]][prettier]
[![react][react_logo]][react]
[![redux/toolkit][redux_logo]][redux]
[![react-router][react-router_logo]][react-router]
[![mui][mui_logo]][mui]
[![jest][jest_logo]][jest]

### Используемые API
[Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
[Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API)


### Как запускать?

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. Выполните команду `yarn dev`
3. Выполните команду `yarn dev --scope=client` чтобы запустить только клиент
4. Выполните команду `yarn dev --scope=server` чтобы запустить только server


### Как добавить зависимости?
В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента 
```yarn lerna add {your_dep} --scope client```

Для сервера
```yarn lerna add {your_dep} --scope server```

И для клиента и для сервера
```yarn lerna add {your_dep}```


Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
```yarn lerna add {your_dep} --dev --scope server```


### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

```yarn test```

### Линтинг

```yarn lint```

### Форматирование prettier

```yarn format```

### Production build

```yarn build```

И чтобы посмотреть что получилось


`yarn preview --scope client`
`yarn preview --scope server`

## Хуки
В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

## Ой, ничего не работает :(

Откройте issue, я приду :)

## Автодеплой статики на vercel
Зарегистрируйте аккаунт на [vercel](https://vercel.com/)
Следуйте [инструкции](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)
В качестве `root directory` укажите `packages/client`

Все ваши PR будут автоматически деплоиться на vercel. URL вам предоставит деплоящий бот

## Production окружение в докере
Перед первым запуском выполните `node init.js`


`docker compose up` - запустит три сервиса
1. nginx, раздающий клиентскую статику (client)
2. node, ваш сервер (server)
3. postgres, вашу базу данных (postgres)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`


### Авторы
[@Mansur903](https://github.com/Mansur903)
[@xatepk](https://github.com/xatepk)
[@V0L40K21](https://github.com/V0L40K21)
[@grmnche](https://github.com/grmnche)
[@Ser4eese](https://github.com/Ser4eese)

[figma]: https://www.figma.com/file/CR1HhQykOHp11nVHLWqOJc/Flappy-progger
[figma-logo]: https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=black
[video]: https://www.loom.com/share/72d54a2364fd4af48d536367ffe5825d?sid=c82ce063-db9b-43be-89f1-e5608ea5f45f
[video_logo]: https://img.shields.io/badge/Loom-625DF5?logo=loom&logoColor=fff&style=for-the-badge
[ts_logo]: https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square
[ts]: https://www.typescriptlang.org/
[redux_logo]: https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white
[redux]: https://redux-toolkit.js.org/
[react_logo]: https://shields.io/badge/react-black?logo=react&style=for-the-badge
[react]: https://react.dev/
[react-router_logo]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[react-router]: https://reactrouter.com/en/main
[jest_logo]: https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white
[jest]: https://jestjs.io/ru/
[mui]: https://mui.com/
[mui_logo]: https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white
[sass]: https://sass-lang.com
[sass-logo]: https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white
[vite]: https://vitejs.dev/
[vite-logo]: https://img.shields.io/badge/Vite-23272f?style=for-the-badge&logo=vite
[nodejs]: https://nodejs.org/en
[nodejs-logo]: https://badgen.net/npm/v/node/18.16.0
[prettier]: https://prettier.io
[prettier-logo]: https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E
[eslint]: https://eslint.org
[eslint-logo]: https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white