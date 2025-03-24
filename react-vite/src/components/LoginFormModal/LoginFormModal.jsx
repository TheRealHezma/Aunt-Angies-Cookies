import { useState } from "react";
import { thunkLogin, thunkDemoLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import SignupFormModal from "../SignupFormModal"; // Import the Signup Modal
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal, setModalContent } = useModal(); // Get setModalContent from useModal
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
            Email:
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
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        {errors.password && <p className="error-message">{errors.password}</p>}

        <div className="login-button-div">
          <button type="submit" className="login-button">Log In</button>
        </div>

        <div className="login-p-tag">
          <p>
            Don't have an account?{" "}
            <span
              className="signup-link"
              onClick={() => setModalContent(<SignupFormModal />)}
            >
              Sign Up {' '}
            </span>
            here !
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
