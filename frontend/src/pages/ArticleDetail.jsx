import React, { useEffect, useState } from 'react';
import instance from '../utils/axiosConfig';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router';

function ArticleDetail({ user }) {

  // libraries
  let navigator = useNavigate();
  const articlePk = useParams().pk;

  // JWT
  const token = localStorage.getItem("access");

  // states
  const [article, setArticle] = useState({
    id: 0,
    title: "",
    content: "",
    created_at: "",
    updated_at: "",
    author: {},
    is_notice: false,
    comments: []
  });

  // methods 
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
  };

  const handleDelete = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      deleteArticle(articlePk);
    } 
  };

  // sub-Components
  const EditMenu = () => (<>
    <ul><Link to={`/articles/form/${articlePk}`}>수정</Link></ul>
    <ul onClick={handleDelete}>삭제</ul>
  </>)

  const CommentList = ({comments, articlePk, fetchArticle}) => {
    const deleteComment = (pk) => {
      if (window.confirm("댓글을 삭제하시겠습니까?")) {
        instance.delete(`articles/${articlePk}/comments/${pk}/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(() => {
          fetchArticle(articlePk);
        })
        .catch((err) => {
          console.log(err);
        })
      }
    };

    return (<div className="comments-list">
    {comments.map((comment) => <div key={comment.id}>
      <span>{comment.author.username} - {comment.content} ({comment.created_at}</span>)
      <button onClick={() => {deleteComment(comment.id)}}>X</button>
    </div>)}
  </div>)
  }
  
  // component startup:
  useEffect(() => {
    fetchArticle(articlePk);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Component
  return (
    <div className="article-container">
      <div className="title">
        <h3>{article.title}</h3>
      </div>
      <div className="about">
        {article.author.username}
      </div>
      <div className="content">
        <p>{article.content}</p>
      </div>
      <li style={{"display": "flex", "flexDirection": "row"}}>
        <ul><Link to="/">목록</Link></ul>
        { user.id === article.author.id && <EditMenu />}
      </li>
      <CommentList comments={article.comments} articlePk={articlePk} fetchArticle={fetchArticle} />
      <CommentForm articlePk={articlePk} fetchArticle={fetchArticle} />
    </div>
  );
}

function CommentForm({ articlePk, fetchArticle }) {
  const [content, setContent] = useState("");
  const handleClick = () => {
    const token = localStorage.getItem("access");
    instance.post(`articles/${articlePk}/comments/`, {content: content}, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(() => {
      // reload article
      fetchArticle(articlePk);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (<div>
    <textarea name="comment" onChange={(e) => {setContent(e.target.value)}} rows="2"></textarea>
    <button onClick={handleClick}>입력</button>
  </div>)
}

export default ArticleDetail;