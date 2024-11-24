import { useState, useContext, useEffect } from "react";
import Dropzone from "./Dropzone";
import "../css/UploadForm.css";
import usePost from "../hooks/usePost";
import { AuthContext } from "../App";
import { toast } from "react-toastify";
import { CircleLoader } from "react-spinners";

const UploadForm = () => {
  const { isLoggedIn, token, setIsLoggedIn } = useContext(AuthContext);
  const { postData, data, error, loading } = usePost("/file/upload", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const [files, setFiles] = useState([]);

  console.log(isLoggedIn, token);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.error("You need to login first\n Click The Profile Icon To Login");
    }
    const formData = new FormData(e.target);
    files.map((file) => {
      formData.append("files", file);
    });
    postData(formData);
  };

  useEffect(() => {
    if (data) {
      toast.success(data.message);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      if (error.message.includes("Token")) {
        setIsLoggedIn(false);
        sessionStorage.removeItem("token");
        toast.error(
          "You need to login first\n Click The Profile Icon To Login"
        );
        return;
      }
      toast.error(error.message);
    }
  }, [error]);
  return (
    <section className="rounded p-5 bg-slate-200 xl:w-1/3 sm:w-3/5 w-3/4">
      <form onSubmit={handleSubmit}>
        <Dropzone files={files} setFiles={setFiles} />
        <label htmlFor="sender_email">Sender</label>
        <input
          type="email"
          id="sender_email"
          name="sender"
          placeholder="example@gmail.com"
          required
        />
        <label htmlFor="recipient_email">Recipient</label>
        <input
          type="email"
          name="recipient"
          placeholder="example@gmail.com"
          id="recipient_email"
          required
        />

        <label htmlFor="message">Message</label>
        <textarea
          placeholder="Drop  A  Message "
          id="message"
          name="message"
        ></textarea>

        <section className="flex justify-end mt-10">
          {loading ? (
            <CircleLoader size={50} className="text-blue-700" />
          ) : (
            <button
              type="submit"
              className="bg-blue-700 text-white font-bold hover:bg-blue-900 p-3 rounded"
            >
              Send Files
            </button>
          )}
        </section>
      </form>
    </section>
  );
};

export default UploadForm;
