import React, { useState, useContext } from "react";

import "./App.css";
import Sidebar from "./components/Sidebar";
import ChatRoom from "./components/ChatRoom";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import { LoginContext } from "./LoginContext";

function App() {
  const [user, setUser] = useContext(LoginContext);
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__container">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/users/:userID" component={ChatRoom} />
              <Route path="/" component={ChatRoom} />
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
