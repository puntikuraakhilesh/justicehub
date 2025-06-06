import React,{useState} from 'react'
import SignUpForm from './SignUp'
import SignInForm from './SignIn'
import "./AuthPage.css";


const AuthPage = () => {
    const [type, setType] = useState("signIn");
    const handleOnClick = text => {
      if (text !== type) {
        setType(text);
        return;
      }
    };
    const containerClass =
      "container " + (type === "signUp" ? "right-panel-active" : "");
    return (
      <div className="App">
        {/* <h2>Sign in/up Form</h2> */}
        <div className={containerClass} id="container">
          <SignUpForm/>
          <SignInForm />
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <h6>
                Sign in to continue your seamless lawyer and citizen management journey with Justice Hub
                </h6>
                <button
                  className="ghost"
                  id="signIn"
                  onClick={() => handleOnClick("signIn")}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Welcome to the Justice Hub community!</h1>
                <h6>Register now and experience hassle-free lawyer community with our efficient system</h6>
                <button
                  className="ghost "
                  id="signUp"
                  onClick={() => handleOnClick("signUp")}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default AuthPage