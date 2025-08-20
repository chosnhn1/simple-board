import React from 'react';
import { Routes, Route } from 'react-router';
import Home from './Home';
import Login from './Login';
import ArticleDetail from './ArticleDetail';
import ArticleForm from './ArticleForm';

function Body() {
  return (
    <main style={{
      flexGrow: 2,
    }}>
      <Routes>
        <Route index path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/articles/form/:pk?" element={<ArticleForm />}></Route>
        <Route path="/articles/:pk" element={<ArticleDetail />}></Route>
      </Routes>
    </main>
  );
}

export default Body;