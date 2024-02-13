import styles from './styles.module.scss'

type Props = {
  position: number
  photo: string
  icon: string
  name: string
  score: number
}

const BoardItem = (props: Props) => {
  return (
    <li className={styles.wrapper}>
      <div className={styles.iconArea}>
        <img src={props.icon} className={styles.icon}></img>
      </div>

      <div className={styles.personalArea}>
        <img src={props.photo} className={styles.icon}></img>
        <span className={styles.name}>{props.name}</span>
      </div>

      <div className={styles.scoreArea}>{props.score}</div>
    </li>
  )
}

export default BoardItem
