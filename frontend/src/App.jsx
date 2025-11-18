import { useEffect, useState } from "react";
// import './App.css';
import Login from "./pages/Login";
import ArticleList from "./pages/ArticleList";
import ArticleDetail from "./pages/ArticleDetail";
import ArticleForm from "./pages/ArticleForm";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import { Routes, Route, useNavigate } from "react-router";
import Signup from "./pages/Signup";
import Whoops404 from "./pages/Whoops404";

function App() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    id: 0,
    username: "anonymousUser",
    is_active: false,
    email: "",
  });
  const [isLogin, setLogin] = useState(false);

  // check token and set User state with server fetch
  const getUserIdFromToken = () => {
    let token = localStorage.getItem("access");
    if (!token) return console.error("no token found");

    const tokenPayload = token.split(".")[1];
    const decodedTokenPayload = atob(tokenPayload);
    return JSON.parse(decodedTokenPayload).user_id;
  };

  const removeUserToken = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  };

  const getUser = () => {
    const userId = getUserIdFromToken();
    if (!userId) return console.info("no token found");

    fetch(`http://localhost:8000/accounts/${userId}/`)
      .then((res) => res.json())
      .then((user) => {
        setUser(user);
      })
      .then(setLogin(true))
      .catch(console.error);
    return console.log("login done.");
  };

  const logout = () => {
    removeUserToken();
    setLogin(false);
    navigate("/");
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="container">
      <Header user={user} isLogin={isLogin} handleLogout={logout} />
      <Routes>
        <Route path="/" element={<ArticleList />}></Route>
        <Route path="login" element={<Login getUser={getUser} />}></Route>
        <Route path="signup" element={<Signup />}></Route>
        <Route path="articles">
          <Route path="form/:pk?" element={<ArticleForm />}></Route>
          <Route path=":pk" element={<ArticleDetail user={user} />}></Route>
        </Route>
        <Route path="*" element={<Whoops404 />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
