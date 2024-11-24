import React, { useEffect, useState } from "react";
import Password from "./Password";
import usePost from "../hooks/usePost";
import { CircleLoader } from "react-spinners";
import { AuthContext } from "../App";
import { useContext } from "react";
import { toast } from "react-toastify";

const SignUp = ({ setShowLogin, setShowSignUp }) => {
  const { setToken, setUser , setIsLoggedIn } = useContext(AuthContext);
  const { postData, data, error, loading } = usePost("/auth/signup");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    postData(formData);
  };

  const handleLogin = () => {
    // Navigate To Login Page
    setShowLogin(true);
    setShowSignUp(false);
  };

  const [err, setErr] = useState(null);
  useEffect(() => {
    if (error) {
      setErr(error.message);
      setToken("");
      sessionStorage.removeItem("token");
      console.log(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setErr(null);
      toast.success(data.message);
      setToken(data.token);
      setUser(data.data);
      setIsLoggedIn(true);
      sessionStorage.setItem("token", data.token);
    }
  }, [data]);
  return (
    <div className="mt-16 text-white">
      <h1 className="text-2xl text-center font-bold">Sign Up</h1>
      <form className="w-4/5 mx-auto relative" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          className="text-black"
          type="text"
          name="name"
          id="name"
          required
        />
        {err && (
          <p className="text-red-700 text-xs font-bold">
            {err.includes("Name") && err}
          </p>
        )}
        <label htmlFor="email">Email</label>
        <input
          className="text-black"
          type="email"
          name="email"
          id="email"
          required
        />
        {err && (
          <p className="text-red-700 text-xs font-bold">
            {err.includes("Email") && err}
          </p>
        )}
        <Password />
        {err && (
          <p className="text-red-700 text-xs font-bold">
            {err.includes("Password") && err}
          </p>
        )}
        <p className="inline text-xs">
          Already Have An Account?{" "}
          <span
            className="cursor-pointer hover:text-blue-950"
            onClick={handleLogin}
          >
            Login
          </span>
        </p>
        <div className="mt-4 flex justify-end">
          {loading ? (
            <CircleLoader className="text-blue-700" />
          ) : (
            <button
              type="submit"
              className="bg-blue-700 text-white font-bold hover:bg-blue-900 p-3 rounded"
            >
              SignUp
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignUp;
