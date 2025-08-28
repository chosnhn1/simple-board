import { useEffect, useState } from 'react';
// import './App.css';
import Login from './pages/Login';
import ArticleList from './pages/ArticleList';
import ArticleDetail from './pages/ArticleDetail';
import ArticleForm from './pages/ArticleForm';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import { Routes, Route } from 'react-router';
import instance from './utils/axiosConfig';

function App() {
  const baseUser = {
    id: 0,
    username: "anonymousUser",
    is_active: false,
    email: "",
  };
  const [user, setUser] = useState(baseUser);

  // check token and set User state with server fetch
  const getUser = () => {
    let token = localStorage.getItem("access")
    if (token) {
      const tokenPayload = token.split('.')[1];
      const decodedTokenPayload = atob(tokenPayload)
      const userId = JSON.parse(decodedTokenPayload).user_id
      
      instance.get(`/accounts/${userId}`)
      .then((res) => {
        const userInfo = res.data;
        setUser(userInfo);
      })
      .catch((err) => {
        console.log(err);
      })
    } else {
      console.log('no token founded');
      return;
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="container">
      <Header user={user} setUser={setUser} baseUser={baseUser} />
      <Routes>
        <Route path="/" element={<ArticleList />}></Route>
        <Route path="login" element={<Login getUser={getUser} /> }></Route>
        <Route path="articles">
          <Route path="form/:pk?" element={<ArticleForm />}></Route>
          <Route path=":pk" element={<ArticleDetail user={user} />}></Route>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;