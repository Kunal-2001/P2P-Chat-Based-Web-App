import React, { useContext } from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { authentication, provider } from "../firebase";
import { LoginContext } from "../LoginContext";

function Login() {
  const [user, setUser] = useContext(LoginContext);

  const signIn = () => {
    authentication
      .signInWithPopup(provider)
      .then((result) => {
        console.log(user, result);
        setUser(result);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__body">
        <img
          alt="whats app logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/800px-WhatsApp.svg.png"
        />
        <div className="login__text">
          <h1>Welcome To WhatsApp Clone</h1>
        </div>

        <Button onClick={signIn}>SignIn with Google</Button>
      </div>
    </div>
  );
}

export default Login;
