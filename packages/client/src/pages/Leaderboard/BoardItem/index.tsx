import styles from './styles.module.scss'

type Props = {
  position: number
  photo: string
  icon: string
  name: string
  score: number
}

const BoardItem = (props: Props) => {
  const getPhoto = (path: string) =>
    path ? path : '../../../src/assets/default-avatar.png'

  return (
    <li className={styles.wrapper}>
      <div className={styles.iconArea}>
        <img alt="icon" src={props.icon} className={styles.icon}></img>
        <div
          className={
            props.position < 4 ? styles.hidden : styles.positionNumber
          }>
          {props.position}
        </div>
      </div>

      <div className={styles.personalArea}>
        <img
          alt="photo"
          src={getPhoto(props.photo)}
          className={styles.photo}></img>
        <span className={styles.name}>{props.name}</span>
      </div>

      <div className={styles.scoreArea}>{props.score}</div>
    </li>
  )
}

export default BoardItem
