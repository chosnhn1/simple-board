import React, { useEffect, useState } from 'react';
import instance from '../utils/axiosConfig';
import { useNavigate, useParams } from 'react-router';

function ArticleForm() {

  const [article, setArticle] = useState({
    title: "",
    content: ""
  });
  
  // todo: use this form to patch article
  const articlePk = useParams().pk;
  const navigate = useNavigate();

  const postArticle = (formData) => {
    const newArticle = {
      "title": formData.get("title"), 
      "content": formData.get("content") 
    }

    instance.request({
      url: articlePk ? `articles/${articlePk}/` : "articles/",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access')}`
      },
      method: articlePk ? "PATCH" : "POST",
      data: newArticle
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

  useEffect(() => {
    if (articlePk) {
      // load article
      fetchArticle(articlePk);
    }
  }, [])

  return (
    <form method="POST" className="article-form" style={{"display": "flex", "flexDirection": "column"}} action={postArticle}
    >
      <label style={{"textAlign": "left"}}>제목</label>
      <input type="text" name="title" value={article.title} onChange={e => setArticle({...article, title: e.target.value})} />
      <label style={{"textAlign": "left"}}>내용</label>
      {/* <input type="text" name="content" id="" /> */}
      <textarea name="content" cols="10" value={article.content} onChange={e => setArticle({...article, content: e.target.value})}></textarea>
      <div style={{"display": "flex", "flexDirection": "row"}}>
        <button type="submit">작성</button>
      </div>
    </form>
  );
}

export default ArticleForm;