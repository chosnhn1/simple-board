import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";

// List page row view
const Article = ({ article }) => {
  const parsed_date = new Date(article.created_at);

  return (
    <tr>
      <td>{article.id}</td>
      <td>
        <Link to={`articles/${article.id}`}>{article.title}</Link>
      </td>
      <td>{article.author}</td>
      <td>{parsed_date.toLocaleString("ko-KR", { timeZone: "UTC" })}</td>
    </tr>
  );
};

const Paginator = ({
  count,
  next,
  previous,
  onPrevious = (f) => f,
  onNext = (f) => f,
}) => {
  return (
    <div>
      <button disabled={!previous} onClick={onPrevious}>
        &lt;
      </button>
      <span>총 게시글 {count}개</span>
      <button disabled={!next} onClick={onNext}>
        &gt;
      </button>
    </div>
  );
};

export default function ArticleList({ style = {} }) {
  let [searchParams] = useSearchParams();
  let navigate = useNavigate();
  const pageNumber = searchParams.get("page") || 1;
  const [page, setPage] = useState({
    count: 0,
    next: 0,
    previous: 0,
    results: [],
  });

  const goToPage = (page) => {
    navigate({
      pathname: "/",
      search: `?page=${page}`,
    });
  };

  useEffect(() => {
    const callPage = pageNumber || 1;
    fetch(`http://localhost:8000/articles/?page=${callPage}`)
      .then((res) => res.json())
      .then((page) => setPage(page))
      .catch(console.error);
  }, [pageNumber]);

  return (
    <div style={style}>
      {page.results && (
        <>
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
              {page.results.map((article) => (
                <Article article={article} key={article.id} />
              ))}
            </tbody>
          </table>
          <Paginator
            {...page}
            onNext={() => goToPage(page.next)}
            onPrevious={() => goToPage(page.previous)}
          />
        </>
      )}
    </div>
  );
}
