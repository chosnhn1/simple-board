import React, { useState } from 'react';
import instance from '../utils/axiosConfig';
import { useNavigate, useParams } from 'react-router';

function ArticleForm({ article = {
  id: 0,
  title: "",
  content: "",
}}) {

  // todo: use this form to patch article
  // const articlePk = useParams().pk;
  const navigate = useNavigate();
  const postArticle = (formData) => {
    const newArticle = {
      "title": formData.get("title"), 
      "content": formData.get("content") 
    }

    instance.post(`articles/`, newArticle, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })
    .then((res) => {
      console.log(res);
      // todo: redirect to article
      navigate("/");
    })
    .catch((err) => {
      console.log(err);
    })
  };

  return (
    <form method="POST" className="article-form" style={{"display": "flex", "flexDirection": "column"}} action={postArticle}
    >
      <label style={{"textAlign": "left"}}>제목</label>
      <input type="text" name="title" defaultValue={article.title} />
      <label style={{"textAlign": "left"}}>내용</label>
      {/* <input type="text" name="content" id="" /> */}
      <textarea name="content" cols="10" defaultValue={article.content}></textarea>
      <div style={{"display": "flex", "flexDirection": "row"}}>
        <button type="submit"></button>
        <button type="reset"></button>
      </div>
    </form>
  );
}

export default ArticleForm;