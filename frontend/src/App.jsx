import { useEffect, useState } from 'react'
import './App.css'
import Header from './Header'
import Home from './Home'
import instance from './utils/axiosConfig';

function App() {
  const [user, setUser] = useState({
    id: 0,
    username: "anonymousUser",
    is_active: false,
    email: "",
    is_authenticated: false
  });

  const getUser = () => {
    let token = localStorage.getItem("access")
    if (token) {
      const tokenPayload = token.split('.')[1];
      const decodedTokenPayload = atob(tokenPayload)
      const userId = JSON.parse(decodedTokenPayload).user_id
      
      instance.get(`/accounts/${userId}`)
      .then((res) => {
        const userInfo = res.data;
        setUser((prevUser) => ({...prevUser, ...userInfo}));
      })
      .catch((err) => {
        console.log(err);
      })
    } else {
      console.log('user not authenticated');
      return;
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Header user={user} />
    </>
  )
}

export default App
