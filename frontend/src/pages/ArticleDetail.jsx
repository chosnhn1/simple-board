import React, { useEffect, useState } from 'react';
import instance from '../utils/axiosConfig';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router';

const EditMenu = () => (<>
  <li>수정</li>
  <li>삭제</li>
</>)

function ArticleDetail({ user }) {

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

  const handleEdit = () => {
    if (user === article.author) {
      navigator(`articles/form/${articlePk}`,{})
    }
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
      <div className="title">
        <h3>{article.title}</h3>
      </div>
      <div className="about">
        {article.author}

      </div>
      <div className="content">
        <p>{article.content}</p>
      </div>
      <li style={{"display": "flex", "flexDirection": "row"}}>
        <ul><Link to="/">목록</Link></ul>
        { user === article.author && <EditMenu />}
        <ul><span onClick={handleEdit}>수정</span></ul>
        <ul><span onClick={handleDelete}>삭제</span></ul>
      </li>
      <div></div>
      <div></div>
    </div>
  );
}

export default ArticleDetail;