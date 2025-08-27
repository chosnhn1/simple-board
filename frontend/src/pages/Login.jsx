import React, { useState } from 'react'
import instance from '../utils/axiosConfig';
import { useNavigate } from 'react-router';

function Login({ getUser }) {
  let navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    instance.post('api/token/', formData)
    .then((res) => {
      console.log(res.data);
      localStorage.setItem("access", res.data.access)
      localStorage.setItem("refresh", res.data.refresh)
    })
    .then(() => {
      getUser();
      navigate("/");
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <form method="post" onSubmit={handleLogin}>
      <input type="text" name="username" />
      <input type="password" name="password" />
      <button type="submit">Login</button>
      <button type="reset">Reset</button>
    </form>
  )
}

export default Login;