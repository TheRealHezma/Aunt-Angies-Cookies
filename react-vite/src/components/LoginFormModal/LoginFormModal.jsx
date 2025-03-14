import { useState } from "react";
import { thunkLogin, thunkDemoLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
      navigate('/cookies'); // Redirect to /cookies after successful login
    }
  };

  const handleDemoLogin = async () => {
    const serverResponse = await dispatch(thunkDemoLogin());
    if (!serverResponse) {
      closeModal();
      navigate('/cookies'); // Redirect to /cookies after successful demo login
    }
  };

  return (
    <div className='loginmodal'>
      <h1 className="loginh1"> Log In</h1>
      <form onSubmit={handleSubmit}>
        <div className="login-email">
          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div className="login-password">
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && <p>{errors.password}</p>}
        </div>

        <div className="login-button-div">
          <button type="submit" className="login-button">Log In</button>
        </div>

        <div className="login-p-tag">
          <p>Don't have an account? Sign up here!</p>
        </div>
        {/* <button type="button" onClick={handleDemoLogin} className="demo-button">Demo User</button> */}
      </form>
    </div>
  );
}

export default LoginFormModal;
