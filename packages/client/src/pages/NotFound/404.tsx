import React from 'react'

import styles from './styles.module.scss'

const NotFoundPage = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>404</h1>
      <p>Упс... здесь ничего нет</p>
      <button>Вернуться на главную</button>
    </div>
  )
}

export default NotFoundPage
