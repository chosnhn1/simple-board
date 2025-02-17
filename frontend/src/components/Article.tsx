import { useEffect, useState } from "react";
import { useParams } from 'react-router'
import instance from "../api/axiosConfig";

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

const Article: React.FC = () => {
  let {articleId} = useParams();

  useEffect(() => {
    const fetchArticle = () => {
      return instance.get(`/articles/${articleId}`)
      .then(response => response.data)
      .catch(error => {
        throw error;
      })
    };
    fetchArticle()
    .then(data => setArticle(data))
    .finally(
      // console.log();
    )

  }, []);

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