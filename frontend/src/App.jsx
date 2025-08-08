import { useState } from 'react'
import './App.css'
import Header from './Header'
import Login from './Login'

function App() {
  const [user, setUser] = useState({
    id: 0,
    username: "anonymousUser",
    is_authenticated: false
  })

  return (
    <>
      <Header user={user} />
      <Login></Login>
    </>
  )
}

export default App
