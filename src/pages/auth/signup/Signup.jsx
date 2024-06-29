import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, fireDB } from "../../../firebase/FirebaseConfig";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate();

  const signup = async () => {
    if (name === "" || email === "" || password === "") {
      return toast.error("All fields are required");
    }

    if (name.length < 3) {
      return toast.error("Name must be at least 3 characters long");
    }

    if (!email.includes("@")) {
      return toast.error("Invalid email format");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      return toast.error(passwordValidationError);
    }

    try {
      const users = await createUserWithEmailAndPassword(auth, email, password);
      const user = {
        name: name,
        uid: users.user.uid,
        email: users.user.email,
        time: Timestamp.now(),
      };

      const userRef = collection(fireDB, "users");
      await addDoc(userRef, user);
      toast.success("Signup Successfully");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/login");
    } catch (error) {
      toast.error("Email Already In Use");
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (value.length < 3) {
      setNameError("Name at least 3 characters");
    } else {
      setNameError("");
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!value.includes("@")) {
      setEmailError("Email at least @");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (password) => {
    const minLength = /.{6,}/;

    if (!minLength.test(password)) {
      return "Password at least 6 characters long";
    }
    return "";
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const error = validatePassword(value);
    setPasswordError(error);
    if (confirmPassword && value !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (password && value !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="max-w-[600px] w-full bg-gray-800 px-8 py-10 rounded-xl">
        <div>
          <h1 className="text-center text-white text-xl mb-4 font-bold">
            Signup Form
          </h1>
        </div>

        <div className="w-full mb-6">
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            name="name"
            className="bg-gray-600 h-[46px] px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Enter your name"
          />
          {nameError && <p className="text-red-500">{nameError}</p>}
        </div>
        <div className="w-full mb-6">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            name="email"
            className="bg-gray-600 h-[46px] px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Enter your email"
          />
          {emailError && <p className="text-red-500">{emailError}</p>}
        </div>

        <div className="w-full mb-6">
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="bg-gray-600 h-[46px] px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder=" Enter your password"
          />
          {passwordError && <p className="text-red-500">{passwordError}</p>}
        </div>
        <div className="w-full mb-6">
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="bg-gray-600 h-[46px] px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder=" Enter your confirm password"
          />
          {confirmPasswordError && (
            <p className="text-red-500">{confirmPasswordError}</p>
          )}
        </div>

        <button
          onClick={signup}
          className="bg-red-500 w-full text-white font-bold px-2 py-2 rounded-lg"
        >
          Signup
        </button>

        <div>
          <h2 className="text-white mt-3 text-center">
            Already Have an account{" "}
            <Link className="text-red-500 font-bold" to={"/login"}>
              Login!
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Signup;
