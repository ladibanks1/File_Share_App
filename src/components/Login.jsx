import React, { useEffect, useState } from "react";
import Password from "./Password";
import usePost from "../hooks/usePost";
import { toast } from "react-toastify";
import { CircleLoader } from "react-spinners";
import { AuthContext } from "../App";
import { useContext } from "react";
const Login = ({ setShowLogin, setShowSignUp }) => {
  const { postData, data, error, loading } = usePost("/auth/login");

  const { setToken, setUser, setIsLoggedIn } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    postData(formData);
  };

  const handleSignUp = () => {
    // Navigate To SignUp Page
    setShowSignUp(true);
    setShowLogin(false);
  };

  useEffect(() => {
    if (data) {
      console.log(data);
      toast.success(data.message);
      sessionStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.data);
      setIsLoggedIn(true);
    }
  }, [data]);

  const [err, setErr] = useState(null);

  useEffect(() => {
    if (error) {
      setErr(error.message);
      console.log(error.message);
      setToken("");
      sessionStorage.removeItem("token");
    }
  }, [error]);

  return (
    <div className="mt-16 text-white">
      <h1 className="text-2xl text-center font-bold">Login In</h1>
      <form className="w-4/5 mx-auto relative" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input className="text-black" type="email" name="email" id="email" />

        {err && (
          <p className="text-red-800 text-sm font-bold">
            {err?.includes("email") && err}
          </p>
        )}
        <Password />

        {err && (
          <p className="text-red-800 text-sm font-bold">
            {err?.includes("password") && err}
          </p>
        )}

        <p className="inline text-xs">
          Don't Have An Account?{" "}
          <span
            className="cursor-pointer hover:text-blue-950"
            onClick={handleSignUp}
          >
            SignUp
          </span>
        </p>
        <div className="mt-4 flex justify-end">
          {loading ? (
            <CircleLoader color="#36d7b7" />
          ) : (
            <button
              type="submit"
              className="bg-blue-700 text-white font-bold hover:bg-blue-900 p-3 rounded"
            >
              Login
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
