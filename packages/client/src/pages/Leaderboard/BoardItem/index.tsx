import styles from './styles.module.scss'

type Props = {
	position: number
	photo: string
	icon: string
	name: string
	score: number
}

const BoardItem = ({icon, position, photo, name, score}: Props) => {
	const getPhoto = (path: string) =>
		path ? path : '../../../src/assets/default-avatar.png'

	return (
		<li className={styles.leader}>
			<div className={styles.leader__iconArea}>
				<img
					alt='icon'
					src={icon}
					className={styles.leader__icon}></img>
				<div
					className={
						position < 4 ? styles.leader__hidden : styles.leader__positionNumber
					}>
					{position}
				</div>
			</div>

			<div className={styles.leader__personalArea}>
				<img
					alt='photo'
					src={getPhoto(photo)}
					className={styles.leader__photo}></img>
				<span className={styles.leader__name}>{name}</span>
			</div>

			<div className={styles.leader__scoreArea}>{score}</div>
		</li>
	)
}

export default BoardItem
