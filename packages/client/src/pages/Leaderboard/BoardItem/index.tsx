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
    <li className={styles.leader}>
      <div className={styles.leader__iconArea}>
        <img alt="icon" src={props.icon} className={styles.leader__icon}></img>
        <div
          className={
            props.position < 4
              ? styles.leader__hidden
              : styles.leader__positionNumber
          }>
          {props.position}
        </div>
      </div>

      <div className={styles.leader__personalArea}>
        <img
          alt="photo"
          src={getPhoto(props.photo)}
          className={styles.leader__photo}></img>
        <span className={styles.leader__name}>{props.name}</span>
      </div>

      <div className={styles.leader__scoreArea}>{props.score}</div>
    </li>
  )
}

export default BoardItem
