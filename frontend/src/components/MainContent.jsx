import {useState, useCallback} from "react";
import {useDropzone} from "react-dropzone";
import {uploadImage} from "../libs/functions";
import WebSocket from "ws";

const MainContent = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      setError("File rejected. Please ensure it's a jpeg or png Image");
      setFile(null);
      return;
    }
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setError("");
      setFile(selectedFile);
    }
  }, []);

  const dropzoneOptions = {
    onDrop,
    accept: {
      "image/jpeg": [".jpeg"],
      "image/png": [".png"],
    },
    maxSize: 30 * 1024 * 1024,
  };
  const {getRootProps, getInputProps, isDragActive, open} =
    useDropzone(dropzoneOptions);

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    setLoading(true);
    const response = await uploadImage(file);
    // response.data.url --- response.data.fileName

    if (!response.data.fileName) {
      return;
    }
    const socketUrl = "wss://example.com/socket";

    const socket = new WebSocket(socketUrl);
    socket.onopen = () => {
      console.log("WebSocket connection established");
      socket.send(JSON.stringify({file: response.data.fileName}));
    };
    socket.onmessage = (event) => {
      console.log("Message from server:", event.data);
    };
    socket.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
    };
    socket.onerror = (error) => {
      setError(error);
      console.log("WebSocket Error:", error);
    };

    setLoading(false);
    return () => {
      socket.close();
    };
  };

  return (
    <div className="w-full flex flex-col items-center justify-center h-[90%]">
      <div className="text-xl text-white font-semibold mb-20 text-center w-full px-10 lg:px-0 lg:w-[800px] pt-10">
        Quickly extract text from photos, handwritten notes, and screenshots by
        using this image to text converter.
      </div>
      <div className="w-[300px] lg:w-[600px] flex items-center relative justify-center h-[180px]">
        <div className="mt-10">
          <div
            {...getRootProps()}
            className="border-2 border-dashed shadow-xl flex items-center justify-center border-gray-500 rounded-lg p-4 text-center cursor-pointer w-[300px] lg:w-[600px] h-[200px]"
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <div className="text-white">Drop the file here ...</div>
            ) : (
              <div className="font-semibold text-lg text-white">
                Drop your file here
                <div>OR</div>
                <div>
                  <button
                    type="button"
                    className="text-blue-500 underline underline-offset-1"
                    onClick={open}
                  >
                    Upload File
                  </button>
                </div>
              </div>
            )}
          </div>
          {file && (
            <div className="mt-4">
              <div className="text-sm text-gray-600">
                Selected file: {file.name}
              </div>

              <div className="w-full flex items-center justify-center">
                <button
                  onClick={handleUpload}
                  className="mt-4 px-4 py-1 text-lg font-normal bg-white text-black rounded hover:bg-neutral-300 transition duration-200"
                >
                  {loading ? "Converting" : "Convert"}
                </button>
              </div>
            </div>
          )}
          {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
