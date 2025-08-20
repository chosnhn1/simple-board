import { useEffect, useState } from 'react';
import ArticleList from './ArticleList';
import instance from './utils/axiosConfig';
import { useNavigate } from 'react-router';

function Home() {
  const [articles, setArticles] = useState([])
  const navigate = useNavigate();
  const getArticles = () => {
    instance.get('articles/')
    .then((res) => {
      setArticles(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const handleWrite = () => {
    navigate("/articles/form");
  }

  useEffect(() => {
    getArticles();
  }, [])

  return (
    <div>
      <ArticleList articles={articles} />
      <button onClick={handleWrite}>작성</button>
    </div>
  );
}

export default Home;