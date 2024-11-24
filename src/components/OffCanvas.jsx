import { FaTimes } from "react-icons/fa";
import SignUp from "./SignUp";
import Login from "./Login";
import { useState } from "react";
import History from "./History";
const OffCanvas = ({ setShow }) => {
  // Handle Canvas View
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(true);
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="bg-blue-500/95 w-72 h-screen fixed top-0 right-0 rounded ">
      <div>
        <FaTimes
          className="text-white text-2xl absolute top-5 right-5 cursor-pointer"
          onClick={() => setShow(false)}
        />
        <span
          className="absolute top-5 left-5 cursor-pointer"
          onClick={() => {
            setShowHistory(true);
            setShowLogin(false);
            setShowSignUp(false);
            if(showHistory){
              setShowHistory(false);
              setShowLogin(false);
              setShowSignUp(true);
            }

          }}
        >
          {showHistory ? (
            <p className="text-black">Hide History</p>
          ) : (
            <p className="text-black">Show History</p>
          )}
        </span>
      </div>

      <div className="pt-20">
        {showSignUp && (
          <SignUp
            {...{
              setShowLogin,
              setShowSignUp,
            }}
          />
        )}

        {showLogin && (
          <Login
            {...{
              setShowLogin,
              setShowSignUp,
            }}
          />
        )}

        {
          showHistory && <History />
        }
      </div>
    </div>
  );
};

export default OffCanvas;
