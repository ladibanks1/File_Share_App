import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { CircleLoader } from "react-spinners";
import { toast } from "react-toastify";
import { FaDownload } from "react-icons/fa";

const DownloadFile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, loading, error } = useFetch(`/download/${id}`);

  useEffect(() => {
    if (error) {
      navigate("/");
      toast.error(error.message);
    }
  }, [error, navigate]);

  const fileDownload = useRef(null);

  const handleDownload = (file) => {
    const elem = fileDownload.current;
    elem.href = file;
    elem.click();
  };
  return (
    <div>
      <h1 className="text-white font-bold text-2xl text-center">
        Download Your Files
      </h1>
      {loading ? (
        <div className="flex justify-center items-center">
          <CircleLoader size={100} />
        </div>
      ) : (
        <div className="flex flex-col gap-5 bg-slate-100 mt-5 w-[80vw] sm:w-[40vw] lg:[38vw] p-5 rounded">
          <a ref={fileDownload} hidden></a>
          {data?.file.files.map((file, index) => {
            const fileName = file.match(/\w+$/);
            console.log(fileName);
            return (
              <section
                className="bg-blue-500 p-3 rounded flex justify-between items-center"
                key={index}
              >
                <p>{fileName}</p>

                <FaDownload
                  onClick={() => handleDownload(file)}
                  className="cursor-pointer hover:text-white"
                />
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DownloadFile;
