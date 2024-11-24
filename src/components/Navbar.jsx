import { useState } from "react";
import { FaPaperPlane, FaUser } from "react-icons/fa";
import OffCanvas from "./OffCanvas";

const Navbar = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="flex bg-blue-600 justify-between items-center px-10 py-5">
        <FaPaperPlane className="text-2xl text-white" />
        <FaUser
          className="text-2xl text-white bg-gray-400 rounded-full w-8 h-8 cursor-pointer"
          onClick={() => {
            setShow(!show);
          }}
        />
        {
            show && <OffCanvas setShow={setShow} />
        }
      </div>

    </div>
  );
};

export default Navbar;
