import React from 'react';
import { Route, Routes, NavLink, Link, useNavigate } from 'react-router'
import Login from './Login'
import './Header.css';

function Header(props) {
  let navigate = useNavigate();
  const { user, setUser, baseUser } = props;

  const handleLogout = () => {
    console.log('clicked!');
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(() => (baseUser));
    navigate("/");
  }

  const AuthMenu = () => {
    if (user.username !== 'anonymousUser') {
      return (<>
      <li>hello, {user.username}!</li>
      <li><a onClick={handleLogout}>Logout</a></li>
      </>)
    } else {
      return (<>
      <Link to="/login">Login</Link>
      </>)
    }

  }

  return (
    <header className="main-header">
      <nav className="navbar">
        <ul>
          <li>Simple Board</li>
          <AuthMenu />
          <Link to="/articles"></Link>
        </ul>
      </nav>
    </header>
  )
}

export default Header