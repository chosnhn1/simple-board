import React, { useEffect, useState } from 'react';
import ArticleDetail from './ArticleDetail';
import { Link, useNavigate, useParams } from 'react-router';
import instance from '../utils/axiosConfig';


// List page row view
const renderArticle = (article) => {
  const parsed_date = new Date(article.created_at);

  return (
    <tr key={article.id}>
    <td>{article.id}</td>
    <td><Link to={`articles/${article.id}`}>{article.title}</Link></td>
    <td>{article.author}</td>
    <td>{parsed_date.toLocaleString("ko-KR", { timeZone: "UTC"})}</td>
  </tr>
  );
};

const Paginator = ({count, next, previous}) => {
  return (
  <div className="paginator">
    <ul>
      <li>Prev</li>
      <li>Next</li>
    </ul>
  </div>
  )
}

function ArticleList() {
  let params = useParams();
  const pageNumber = params.page;
  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState({
    count: 0,
    next: false,
    previous: false,
    results: []
  });

  // 
  const fetchPage = (pageNumber = 1) => {
    instance.get(`articles/?page=${pageNumber}`)
    .then((res) => {
      const newPage = res.data;
      setPage(newPage);
      setIsLoaded(true);
    })
    .catch((err) => {
      console.log(err);
    })
  };
  
  // initial render
  useEffect(() => {
    fetchPage(pageNumber);
  }, [])

  return (
    <div>
    <table className="article-list">
      <thead>
        <tr>
          <td>번호</td>
          <td>제목</td>
          <td>작성자</td>
          <td>작성일</td>
        </tr>
      </thead>
      <tbody>
        { isLoaded && page.results.map((article) => (renderArticle(article)))}
      </tbody>
    </table>
    <Paginator previous={page.previous} next={page.next} count={page.count} />
  </div>
  )
}

export default ArticleList;