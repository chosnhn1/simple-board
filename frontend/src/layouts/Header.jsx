import React from "react";
import { Route, Routes, NavLink, Link } from "react-router";
// import './Header.css';

export default function Header({
  user = {},
  isLogin = false,
  handleLogout = (f) => f,
  style = {},
}) {
  return (
    <header style={style} className="main-header">
      <nav className="navbar">
        <ul>
          <li>Simple Board</li>
          {isLogin && (
            <>
              <li>Hello, {user.username}!</li>
              <Link to="/articles/form/">Write</Link>
              <li onClick={handleLogout}>Logout</li>
            </>
          )}
          {!isLogin && (
            <>
              <li>Hello!</li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="signup">Sign-up</Link>
              </li>
            </>
          )}
          <li>
            <Link to="/articles">Article List</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
