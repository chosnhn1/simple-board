import React, { useEffect, useState } from 'react';
import instance from './utils/axiosConfig';
import { useParams } from 'react-router';
import { Link } from 'react-router';

function ArticleDetail() {

  const [article, setArticle] = useState({})

  const articlePk = useParams().pk;

  const getArticle = (pk) => {
    instance.get(`articles/${pk}`)
    .then((res) => {
      console.log(res.data)
      setArticle(() => ({...res.data}))
    })
    .catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    getArticle(articlePk);
  }, [])

  return (
    <div className="article-container">
      <div className="title">{article.title}</div>
      <div className="about"></div>
      <div className="content">{article.contents}</div>
      <div><Link to="/">List</Link></div>
    </div>
  );
}

export default ArticleDetail;