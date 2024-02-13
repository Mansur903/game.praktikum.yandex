import styles from './styles.module.scss'
import BoardItem from './BoardItem/index'
import { useEffect, useState } from 'react'
import { logDOM } from '@testing-library/react'

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

  const setIcon = () => {
    return ''
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.backgroundWrapper}>
        <button className={styles.button}>На главную</button>
        <h1 className={styles.header}>Рейтинг игроков</h1>

        <ul className={styles.boardContainer}>
          {list.map(item => (
            <BoardItem
              position={item.position}
              name={item.name}
              photo={item.photo ? item.photo : ''}
              icon={setIcon()}
              score={item.score}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Leaderboard
