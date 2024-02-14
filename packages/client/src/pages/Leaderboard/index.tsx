import styles from './styles.module.scss'
import BoardItem from './BoardItem/index'
import { useEffect, useState } from 'react'

// моковые данные
const leaders = [
  {
    position: 1,
    name: 'Michael',
    score: 15,
  },
  {
    position: 2,
    name: 'Alex',
    score: 12,
  },
  {
    position: 3,
    name: 'Nikita',
    score: 10,
  },
  {
    position: 4,
    name: 'Dima',
    score: 5,
  },
  {
    position: 5,
    name: 'Oleg',
    score: 4,
  },
  {
    position: 6,
    name: 'Oleg2',
    score: 3,
  },
  {
    position: 7,
    name: 'Oleg3',
    score: 2,
  },
  {
    position: 8,
    name: 'Oleg4',
    score: 1,
  },
]
const server = {
  getLeaders() {
    return new Promise(resolve => {
      setTimeout(() => resolve(leaders), 150)
    })
  },
}

interface ILeader {
  position: number
  name: string
  score: number
  photo?: string
}

const Leaderboard = () => {
  const [list, setList] = useState<ILeader[]>([])

  useEffect(() => {
    server.getLeaders().then(response => setList(response as ILeader[]))
  }, [])

  const setIconPath = (position: number) => {
    switch (position) {
      case 1:
        return '../../src/assets/trophy1.png'
      case 2:
        return '../../src/assets/trophy2.png'
      case 3:
        return '../../src/assets/trophy3.png'
      default:
        return '../../src/assets/round.png'
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.page}>
        <button className={styles.page__button}>На главную</button>
        <h1 className={styles.page__header}>Рейтинг игроков</h1>

        <ul className={styles.page__board}>
          {list.map((item, index) =>
            index < 8 ? (
              <BoardItem
                position={item.position}
                name={item.name}
                photo={item.photo ? item.photo : ''}
                icon={setIconPath(item.position)}
                score={item.score}
              />
            ) : null
          )}
        </ul>
      </div>
    </div>
  )
}

export default Leaderboard
