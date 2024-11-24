import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Password = () => {
  const [showPassword, setShowPassword] = useState(false);

  const articleClass = "cursor-pointer right-2 absolute top-[47px] text-black";
  return (
    <div className="relative">
      <label htmlFor="password">Password</label>
      <input
        className="text-black"
        type={showPassword ? "text" : "password"}
        name="password"
        id="password"
        required
      />
      {showPassword ? (
        <article>
          <FaEye
            className={articleClass}
            onClick={() => setShowPassword(!showPassword)}
          />
        </article>
      ) : (
        <article>
          <FaEyeSlash
            className={articleClass}
            onClick={() => setShowPassword(!showPassword)}
          />
        </article>
      )}
    </div>
  );
};

export default Password;
