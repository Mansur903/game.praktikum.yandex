import styles from './styles.module.scss'
import BoardItem from './BoardItem/index'

const Leaderboard = () => {

  return <div className={styles.wrapper}>
    <div className={styles.backgroundWrapper}>
      <button className={styles.button}>На главную</button>
      <h1 className={styles.header}>Рейтинг игроков</h1>

      <ul className={styles.boardContainer}>
        <BoardItem />
      </ul>
    </div>
  </div>
}

export default Leaderboard
