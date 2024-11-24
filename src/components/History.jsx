import useFetch from "../hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../App";
import { CircleLoader } from "react-spinners";
const History = () => {
  const { token, user } = useContext(AuthContext);
  const { data, loading, error } = useFetch(`/file/history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <CircleLoader size={100} color="blue" />
      </div>
    );
  return (
    <div>
      <h1 className="text-2xl font-bold text-center">History</h1>
      <div className="flex flex-col">
        {data === null || Object?.values(data)?.length === 0 ? (
          <p>No History</p>
        ) : (
          <>
            {data.history.map((file, index) => {
              return (
                <div key={index} className="bg-blue-200 my-2 p-2">
                  <p>
                    <span className="font-bold">Recipient Mail: </span>
                    {file.recipient.substring(0, 15).concat("...")}
                  </p>
                  <p>
                    <span className="font-bold">File Link: </span>
                    {file.files.map((items) => {
                      const fileName = items.match(/\w+$/);
                      return (
                        <a
                          href={items}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {String(fileName).substring(0, 5).concat("...")}
                        </a>
                      );
                    })}
                  </p>
                  <p>
                    <span className="font-bold">Sent On: </span>
                    {new Date(file.createdAt).toLocaleString()}
                  </p>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default History;
