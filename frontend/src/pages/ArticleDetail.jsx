import React, { useEffect, useState } from 'react';
import instance from '../utils/axiosConfig';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router';


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
  };

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
    if (user.id === article.author) {
      navigator(`form/${articlePk}`)
    }
  }

  const handleDelete = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      deleteArticle(articlePk);
    } 
  }

  const EditMenu = () => (<>
    <Link to={`/articles/form/${articlePk}`}>수정</Link>
    <ul onClick={handleEdit}>수정</ul>
    <ul onClick={handleDelete}>삭제</ul>
  </>)

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
        { user.id === article.author && <EditMenu />}
      </li>
      <div></div>
      <div></div>
    </div>
  );
}

export default ArticleDetail;