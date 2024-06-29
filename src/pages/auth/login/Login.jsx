import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/FirebaseConfig";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const signin = async () => {
    if (email === "" || password === "") {
      return toast.error("All fields are required");
    }

    if (!email.includes("@")) {
      return toast.error("Invalid email format");
    }

    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      return toast.error(passwordValidationError);
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("user", JSON.stringify(result));
      toast.success("Login Successfully");
      navigate("/");
    } catch (error) {
      toast.error("Login Failed");
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!value.includes("@")) {
      setEmailError("Email must include '@'");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (password) => {
    const minLength = /.{6,}/;

    if (!minLength.test(password)) {
      return "Password must be at least 6 characters";
    }
    return "";
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const error = validatePassword(value);
    setPasswordError(error);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 px-4">
      <div className="bg-gray-800 p-10 rounded-xl border border-gray-700 w-full max-w-md">
        <h1 className="text-center text-white text-xl mb-4 font-bold">Login</h1>
        <div className="mb-6">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            name="email"
            className="bg-gray-600 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Email"
          />
          {emailError && <p className="text-red-500">{emailError}</p>}
        </div>
        <div className="mb-6">
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="bg-gray-600 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Password"
          />
          {passwordError && <p className="text-red-500">{passwordError}</p>}
        </div>
        <div className="flex justify-center mb-3">
          <button
            onClick={signin}
            className="bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg"
          >
            Login
          </button>
        </div>
        <h2 className="text-white text-center">
          Don't have an account{" "}
          <Link className="text-yellow-500 font-bold" to={"/signup"}>
            Signup!
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default Login;
