import React from 'react';
import instance from './utils/axiosConfig';

function Header(props) {
  const user = props.user;

  const handleLogin = () => {
    console.log('clicked!');
  }

  const handleLogout = () => {
    instance.post('/accounts/logout', )
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    })
  
    console.log('clicked!');
  }

  return (
    <header>
      <ul>
        <li>Simple Board</li>        
        <li><a onClick={handleLogin}>Login</a></li>
        <li>hello, {user.username}!</li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </header>
  )
}

export default Header