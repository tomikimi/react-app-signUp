// import "@coreui/coreui/dist/css/coreui.min.css";
import "./App.css";
import { FcGoogle } from "react-icons/fc";
import { FaExclamation } from "react-icons/fa6";
import logo from "./assets/images/logo.avif";
import logo_png from "./assets/images/logo.png";
import { useReducer } from "react";
// import { CSpinner } from "@coreui/react";

const initialState = {
  fullname: "",
  email: "",
  DOB: "",
  phoneNumber: "",
  nationality: "",
  ID: "",
  password: "",
  confirmPassword: "",
  // error,loading,success
  status: "",
  message: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "fullNameData":
      return { ...state, fullname: action.payload };
    case "emailData":
      return { ...state, email: action.payload };
    case "dobData":
      return { ...state, DOB: action.payload };
    case "phoneNumberData":
      return { ...state, phoneNumber: action.payload };
    case "nationalityData":
      return { ...state, nationality: action.payload };
    case "IDData":
      return { ...state, ID: action.payload };
    case "passwordData":
      return { ...state, password: action.payload };
    case "confirmPasswordData":
      return { ...state, confirmPassword: action.payload };
    case "processingData":
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
      };
    case "resetFields":
      return {
        fullname: "",
        email: "",
        DOB: "",
        phoneNumber: "",
        nationality: "",
        ID: "",
        password: "",
        confirmPassword: "",
        status: "",
        message: "",
      };
    default:
      return { state: "", action: "" };
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    fullname,
    email,
    DOB,
    phoneNumber,
    nationality,
    ID,
    status,
    message,
    password,
    confirmPassword,
  } = state;
  const handleFullName = function (e) {
    dispatch({ type: "fullNameData", payload: e.target.value });
  };
  const handleEmail = function (e) {
    dispatch({ type: "emailData", payload: e.target.value });
  };
  const handlePhoneNumber = function (e) {
    dispatch({ type: "phoneNumberData", payload: e.target.value });
  };
  const handleNationality = function (e) {
    dispatch({ type: "nationalityData", payload: e.target.value });
  };
  const handleDOB = function (e) {
    dispatch({ type: "dobData", payload: e.target.value });
  };
  const handleID = function (e) {
    dispatch({ type: "IDData", payload: e.target.value });
  };
  const handlePassword = function (e) {
    dispatch({ type: "passwordData", payload: e.target.value });
  };
  const handleConfirmPassword = function (e) {
    dispatch({ type: "confirmPasswordData", payload: e.target.value });
  };

  const handleClearField = function (e) {
    e.preventDefault();
    dispatch({
      type: "resetFields",
    });
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    dispatch({
      type: "processingData",
      payload: { status: "processing", message: "event in progress." },
    });
    if (password !== confirmPassword) {
      dispatch({
        type: "processingData",
        payload: {
          status: "error",
          message: "Password does not match confirm password.",
        },
      });
      return;
    }
    if (
      !fullname ||
      !email ||
      !DOB ||
      !phoneNumber ||
      !nationality ||
      !ID ||
      !password
    ) {
      dispatch({
        type: "processingData",
        payload: {
          status: "error",
          message: "One or More fields were not filled.",
        },
      });
    } else {
      const data = {
        fullname,
        email,
        DOB,
        phoneNumber,
        nationality,
        ID,
        password,
      };
      const userData = Boolean(localStorage.getItem("userData"));
      let userInfo = [];
      if (!userData) {
        userInfo.push(data);
        localStorage.setItem("userData", JSON.stringify(userInfo));
        dispatch({
          type: "processingData",
          payload: { status: "success", message: "Record Saved Successfully" },
        });
        dispatch({
          type: "resetFields",
        });
      } else {
        const savedData = localStorage.getItem("userData");
        const parsedData = JSON.parse(savedData);
        console.log(parsedData);
        const fullnameData = parsedData.find((data) =>
          data.fullname.includes(fullname)
        );
        console.log(fullnameData);
        if (fullnameData) {
          dispatch({
            type: "processingData",
            payload: {
              status: "error",
              message: `${fullname} record already exists`,
            },
          });
          return;
        }
        localStorage.setItem("userData", JSON.stringify([...parsedData, data]));
        dispatch({
          type: "resetFields",
        });
      }
    }
  };

  return (
    <>
      <div className="container">
        {/* <Login></Login> */}
        <SignUp
          fullName={fullname}
          email={email}
          phoneNumber={phoneNumber}
          dob={DOB}
          nationality={nationality}
          ID={ID}
          password={password}
          confirmPassword={confirmPassword}
          status={status}
          message={message}
          handleEmail={handleEmail}
          handleFullName={handleFullName}
          handlePhoneNumber={handlePhoneNumber}
          handleDOB={handleDOB}
          handleNationality={handleNationality}
          handleID={handleID}
          handlePassword={handlePassword}
          handleConfirmPassword={handleConfirmPassword}
          handleSubmit={handleSubmit}
          clearField={handleClearField}
        ></SignUp>
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

function SignUp({
  fullName,
  email,
  phoneNumber,
  nationality,
  ID,
  dob,
  status,
  message,
  password,
  confirmPassword,
  clearField,
  handleFullName,
  handleEmail,
  handleID,
  handlePhoneNumber,
  handleNationality,
  handlePassword,
  handleConfirmPassword,
  handleDOB,
  handleSubmit,
}) {
  return (
    <>
      <div className="register-container">
        <div className="register-header-container">
          <img src={logo_png} alt="logo" className="img_2" />
          <h2 className="register-header">Sign up</h2>
          <p className="register-paragraph">
            Enter your details below to create your account and get started.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="register-input-container">
            <div>
              <div className="register-input-controller">
                <label className="label-control" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  value={fullName}
                  name="fullName"
                  className="text-control"
                  type="text"
                  onChange={handleFullName}
                  placeholder="enter..."
                />
              </div>
            </div>
            <div>
              <div className="register-input-controller">
                <label className="label-control" htmlFor="email">
                  Email
                </label>
                <input
                  name="email"
                  value={email}
                  onChange={handleEmail}
                  className="text-control"
                  type="email"
                  placeholder="example@gmail.com"
                />
              </div>
            </div>
            <div>
              <div className="register-input-controller">
                <label className="label-control" htmlFor="dob">
                  Date of Birth
                </label>
                <input
                  name="dob"
                  value={dob}
                  onChange={handleDOB}
                  className="text-control"
                  type="date"
                  placeholder="MM/DD/YY"
                />
              </div>
            </div>
            <div>
              <div className="register-input-controller">
                <label className="label-control" htmlFor="phoneNumber">
                  Phone Number
                </label>
                <input
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={handlePhoneNumber}
                  className="text-control"
                  type="number"
                  placeholder="enter phone number..."
                />
              </div>
            </div>
            <div>
              <div className="register-input-controller">
                <label className="label-control" htmlFor="nationality">
                  Nationality
                </label>
                <select
                  name="nationality"
                  value={nationality}
                  onChange={handleNationality}
                  className="text-control"
                >
                  <option value={""}>Select</option>
                  <option value={"Nigeria"}>Nigeria</option>
                </select>
              </div>
            </div>
            <div>
              <div className="register-input-controller">
                <label className="label-control" htmlFor="ID_Type">
                  ID Type
                </label>
                <select
                  name="ID_Type"
                  value={ID}
                  onChange={handleID}
                  className="text-control"
                >
                  <option value={""}>Select</option>
                  <option value={"NIN"}>NIN</option>
                </select>
              </div>
            </div>
            <div>
              <div className="register-input-controller">
                <label className="label-control" htmlFor="password">
                  Password
                </label>
                <input
                  name="password"
                  value={password}
                  onChange={handlePassword}
                  className="text-control"
                  type="password"
                  placeholder="enter..."
                />
              </div>
            </div>
            <div>
              <div className="register-input-controller">
                <label className="label-control" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPassword}
                  className="text-control"
                  type="password"
                  placeholder="enter..."
                />
              </div>
            </div>
            <div className="button-controller">
              <button className="btn btn-cancel" onClick={clearField}>
                cancel{" "}
              </button>
            </div>
            <div className="button-controller">
              {status === "" ? (
                <button className="btn btn-register" type="submit">
                  confirm
                </button>
              ) : (
                <button className="btn btn-register" type="submit">
                  {status === "processing" ? "Processing..." : "confirm"}
                </button>
              )}
            </div>
          </div>
        </form>
        <div className="signUp-footer">
          <span className="signUp-text">Already have an account?</span>
          <a className="signUp-link" href="">
            Login
          </a>
        </div>

        <div
          className={`notification-container ${
            status === "" ? "hide" : "display"
          }`}
        >
          {status === "error" ? (
            <span className="signUp-text error">{message}</span>
          ) : (
            <span className="signUp-text success">{message}</span>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
