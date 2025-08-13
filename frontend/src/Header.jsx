import React from 'react';
import instance from './utils/axiosConfig';
import { Route, Routes, NavLink, Link, useNavigate } from 'react-router'
import Login from './Login'

function Header(props) {
  let navigate = useNavigate();
  const user = props.user;
  const is_authenticated = user.is_authenticated;
  const handleLogout = () => {

    console.log('clicked!');
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    navigate("/");
  }

  return (
    <header className="main-header">
        <ul>
          <li>Simple Board</li>        
          <Link to="/login">Login</Link>
          <li>hello, {user.username}!</li>
          <li><a onClick={handleLogout}>Logout</a></li>
          <Link to="/articles"></Link>
        </ul>
    </header>
  )
}

export default Header