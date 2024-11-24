import React, { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaTimes, FaCloudUploadAlt } from "react-icons/fa";

const Dropzone = ({ files, setFiles }) => {
  const addMore = useRef(null);
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      setFiles((prev) => [...prev, file]);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  if (files.length > 0) {
    return (
      <div>
        {files.map((file, index) => (
          <div
            key={index}
            className="flex justify-between bg-slate-400 items-center p-2 rounded"
          >
            <p>{file.name}</p>
            <FaTimes
              className="cursor-pointer"
              onClick={() => {
                setFiles(files.filter((_file, i) => i !== index));
              }}
            />
          </div>
        ))}

        <input
          type="file"
          multiple
          ref={addMore}
          hidden
          onChange={(e) => {
            setFiles([...files, ...e.target.files]);
          }}
        />

        <button
          type="button"
          className="bg-blue-600 p-1 w-full mt-5 rounded text-white font-bold hover:bg-blue-900"
          onClick={() => {
            addMore.current.click();
          }}
        >
          Add More Files
        </button>
      </div>
    );
  }

  return (
    <div {...getRootProps()} style={styles.dropzone}>
      <input {...getInputProps()} required />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <div className="flex justify-center flex-col items-center">
          <FaCloudUploadAlt className="text-center text-4xl" />
          <p>Drag And Drop</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  dropzone: {
    border: "2px dashed #cccccc",
    borderRadius: "4px",
    padding: "10px",
    textAlign: "center",
    cursor: "pointer",
  },
};

export default Dropzone;
