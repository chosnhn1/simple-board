import React, { useEffect, useState } from 'react';
import instance from './utils/axiosConfig';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router';

function ArticleDetail() {

  let navigator = useNavigate();

  const [article, setArticle] = useState({})
  const articlePk = useParams().pk;
  const fetchArticle = (pk) => {
    instance.get(`articles/${pk}`)
    .then((res) => {
      console.log(res.data)
      setArticle(() => ({...res.data}))
    })
    .catch((err) => {
      console.log(err)
    });
  }

  const deleteArticle = (pk) => {
    const token = localStorage.getItem("access");
    instance.delete(`articles/${pk}/`, {
      "headers": {
        "Authorization": `Bearer ${token}`
      }
    })
    .then((res) => {
      console.log(res.data);
      navigator("/");
      // redirect to list
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const handleDelete = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      deleteArticle(articlePk);
    } 
  }

  // component startup:
  useEffect(() => {
    fetchArticle(articlePk);
  }, [])

  return (
    <div className="article-container">
      <div className="title">{article.title}</div>
      <div className="about"></div>
      <div className="content">{article.content}</div>
      <li style={{"display": "flex", "flexDirection": "row"}}>
        <ul><Link to="/">목록</Link></ul>
        <ul><Link>수정</Link></ul>
        <ul><span onClick={handleDelete}>삭제</span></ul>
      </li>
      <div></div>
      <div></div>
    </div>
  );
}

export default ArticleDetail;