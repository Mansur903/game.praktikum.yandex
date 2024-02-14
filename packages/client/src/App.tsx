import { useEffect } from 'react'
import './App.css'
import Profile from './pages/Profile/Profile'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return (
    <div className="App">
      <Profile
        avatarImage="src/pages/Profile/images/avatar.png"
        record={48}
        name="john"
        email="john29@gmail.com"
      />
    </div>
  )
}

export default App
