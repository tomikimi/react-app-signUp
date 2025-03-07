import "./App.css";
import { FcGoogle } from "react-icons/fc";
import logo from "./assets/images/logo.avif";
import logo_png from "./assets/images/logo.png";

function App() {
  return (
    <>
      <div className="container">
        {/* <Login></Login> */}
        <SignUp></SignUp>
      </div>
    </>
  );
}

function Login() {
  return (
    <>
      <div className="signUp-container">
        <div className="img-container">
          <img src={logo} alt="logo" className="img" />
        </div>
        <div className="textHead-container">
          <h1 className="textHead-header">Welcome Back </h1>
          <p className="textHead-paragraph">Glad to see you again👋🏽</p>
          <p className="textHead-paragraph">Login to your account below</p>
        </div>
        <div className="btnGoogle-container">
          <button className="btn btnGoogle">
            <FcGoogle></FcGoogle> <span>Continue with Google</span>
          </button>
        </div>
        <form action="">
          <div className="input-controller">
            <label className="label-control" htmlFor="email">
              email
            </label>
            <input
              className="text-control"
              type="text"
              placeholder="enter email..."
            />
          </div>
          <div className="input-controller">
            <label className="label-control" htmlFor="password">
              password
            </label>
            <input
              className="text-control"
              type="password"
              placeholder="enter password..."
            />
          </div>
          <div className="button-controller">
            <button className="btn btn-login">Login </button>
          </div>
        </form>
        <div className="signUp-footer">
          <span className="signUp-text">Dont have an account?</span>
          <a className="signUp-link" href="">
            Sign up for free
          </a>
        </div>
      </div>
    </>
  );
}

function SignUp() {
  return (
    <>
      <div className="register-container">
        <div className="register-header-container">
          <img src={logo_png} alt="logo" className="img_2" />
          <h2 className="">Sign up</h2>
          <p>
            Enter your details below to create your account and get started.
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
