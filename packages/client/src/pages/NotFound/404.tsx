import React from 'react'

import styles from './styles.module.scss'

const NotFoundPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.contentBlock}>
        <h1 className={styles.header}>404</h1>
        <p className={styles.paragraph}>Упс... здесь ничего нет</p>
        <button className={styles.button}>Вернуться на главную</button>
      </div>
    </div>
  )
}

export default NotFoundPage
