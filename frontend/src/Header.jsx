import React from 'react';
import { Route, Routes, NavLink, Link, useNavigate } from 'react-router'
import Login from './Login'
import './Header.css';

function Header(props) {
  let navigate = useNavigate();
  const user = props.user;

  const handleLogout = () => {
    console.log('clicked!');
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/");
  }

  return (
    <header className="main-header">
      <nav className="navbar">
        <ul>
          <li>Simple Board</li>        
          <Link to="/login">Login</Link>
          <li>hello, {user.username}!</li>
          <li><a onClick={handleLogout}>Logout</a></li>
          <Link to="/articles"></Link>
        </ul>
      </nav>
    </header>
  )
}

export default Header