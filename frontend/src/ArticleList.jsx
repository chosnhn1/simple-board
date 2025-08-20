import React from 'react';
import ArticleDetail from './ArticleDetail';
import { Link } from 'react-router';

function ArticleList(props) {
  const articles = props.articles
  const renderedArticle = (article) => {
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

  return (<table className="article-list">
    <thead>
      <tr>
        <td>번호</td>
        <td>제목</td>
        <td>작성자</td>
        <td>작성일</td>
      </tr>
    </thead>
    <tbody>
      {articles.map(article => (renderedArticle(article)))}
    </tbody>
  </table>)
}

export default ArticleList;