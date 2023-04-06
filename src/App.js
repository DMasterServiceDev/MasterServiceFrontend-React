import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Registration from './components/Registration';
import Login from './components/Login'
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardMaster from "./components/BoardMaster";
import AuthService from "./services/auth.service";
import Activation from './components/Activation';
import Calendar from './components/calendar/Calendar';
import './App.css';

function App() {
  const [showActivate, setShowActivate] = useState(false);
  const [showMasterBoard, setShowMasterBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  let navigate = useNavigate();
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      console.log("activat??", user.status.includes("STATUS_ACTIVE"))
      if (!user.status.includes("STATUS_ACTIVE")) {
        setShowActivate(user.status.includes("STATUS_ACTIVE"));
      } else setShowActivate(true);
      setShowMasterBoard(user.role.includes("ROLE_MASTER"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowMasterBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-nav">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Домашняя странциа
            </Link>
          </li>

          {showMasterBoard && (
            <li className="nav-item">
              <Link to={"/master"} className="nav-link">
                Master Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (showActivate ?
          (<div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.login}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>) : (<Activation />)
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Вход
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Регистрация
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login router={navigate} />} />
          <Route path="/register" element={<Registration router={navigate} />} />
          <Route path="/profile" element={<Profile showActivate={showActivate} />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/master" element={<BoardMaster />} />
          <Route path="/activation" element={<Activation  router={navigate}/>} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;