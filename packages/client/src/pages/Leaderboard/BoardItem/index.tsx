import styles from './styles.module.scss'

type Props = {
  position: number;
  image: string;
  name: string;
  score: number;
}

const BoardItem = (props: Props) => {
  return (
    <li className={styles.wrapper}>
      <div className={styles.iconArea}>
        <img src={props.image} className={styles.icon}></img>
      </div>
    </li>
  )
}

export default BoardItem
