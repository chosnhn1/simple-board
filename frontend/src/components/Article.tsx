import { useEffect, useState } from "react";
import axios from "axios";

interface ArticleData {
  title: string;
  contents: string;
  created_at: string;
  updated_at: string;
  author: string;
};

const defaultArticle: ArticleData = {
  title: '',
  contents: '',
  created_at: '',
  updated_at: '',
  author: '',
}

const Article: React.FC<{articleId: number}> = ({articleId}) => {
  useEffect(() => {
    const fetchArticle = (id) => {
      return axios.get(`/articles/${articleId}`)
      .then(response => response.data)
      .catch(error => {
        throw error;
      })
    };
    fetchArticle(articleId)
    .then(data => setArticle(data))
    .finally(
      // console.log();
    )

  })

  const [article, setArticle] = useState<ArticleData>(defaultArticle);

  return (
    <section>
      <div>Title: {article.title}</div>
      <div>Author: {article.author}</div>
      <div>
        <p>{article.contents}</p>
      </div>
      <div>{article.created_at}</div>
      <div>{article.updated_at}</div>
    </section>
  )
}

export default Article