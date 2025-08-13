import { useEffect, useState } from 'react';
import ArticleList from './ArticleList';
import instance from './utils/axiosConfig';

function Home() {
  const [articles, setArticles] = useState([])
  const getArticles = () => {
    instance.get('articles/')
    .then((res) => {
      setArticles(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    getArticles();
  }, [])

  return (
    <div>
      <ArticleList articles={articles} />
    </div>
  );
}

export default Home;