import { useEffect, useState } from 'react';
import ArticleList from './ArticleList';
import instance from './utils/axiosConfig';
import { useNavigate, useSearchParams } from 'react-router';

function Home() {
  const [page, setPage] = useState({
    count: 0,
    next: null,
    previous: null,
    results: []
  })
  const navigate = useNavigate();
  let [ params ] = useSearchParams();
  const targetPage = params.get("page");
  const fetchPage = (p = 1) => {
    instance.get(`articles/?page=${p}`)
    .then((res) => {
      setPage(() => (res.data));
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const handleWrite = () => {
    navigate("/articles/form");
  }

  useEffect(() => {
    if (targetPage) {
      fetchPage(targetPage);
    } else {
      fetchPage();
    }
  }, [])

  return (
    <div>
      <ArticleList page={page} fetchPage={fetchPage} targetPage={targetPage} />
      <button onClick={handleWrite}>작성</button>
    </div>
  );
}

export default Home;