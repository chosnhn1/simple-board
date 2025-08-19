import React, { useState } from 'react';
import instance from './utils/axiosConfig';

function ArticleForm(props) {
  initialArticle = {
    title: "",
    content: "",
  }
  const [article, setArticle] = useState(props.article || initialArticle);

  const postArticle = (pk) => {

    instance.post(`articles/`, article, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((res) => {
      console.log("done");
      // redirect to article
    })
    .catch((err) => {
      console.log(err);
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postArticle();
  };

  return (
    <form action={() => ()} method="POST" className="article-form">
      <input type="text" name="title" id="" />
      <input type="text" name="contents" id="" />
      <button type="submit"></button>
      <button type="reset"></button>
    </form>
  );
}

export default ArticleForm;