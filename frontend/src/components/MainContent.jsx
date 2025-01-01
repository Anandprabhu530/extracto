import {useState, useCallback} from "react";
import {useDropzone} from "react-dropzone";
import {uploadImage} from "../libs/functions";

const MainContent = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [text, setText] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [extracting, setExtracting] = useState(false);

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

    setUploading(true);
    const response = await uploadImage(file);
    setUploading(false);
    // response.data.url --- response.data.fileName

    setExtracting(true);
    if (!response.data.fileName) {
      setError("Something went wrong.");
      return;
    }
    const socketUrl = import.meta.env.VITE_WEBSOCKET_URL;

    const socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      socket.send(JSON.stringify({file: response.data.fileName}));
    };

    socket.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if (response.data !== null) {
        setText(response.data);
      } else if (response.errorCode === 1) {
        setError("No Text in given Image");
      } else {
        setError("An Error Occured");
      }
    };

    setFile(null);
    setExtracting(false);
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
      {text ? (
        <div className="text-xl text-white w-[85%] md:w-[500px] lg:w-[800px] p-4 border-2 border-white rounded-lg">
          {text}
        </div>
      ) : (
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
                  <div className="italic font-normal">OR</div>
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
                    {uploading && "Uploading"}
                    {extracting && "Extracting"}
                    {!uploading && !extracting && "Extract"}
                  </button>
                </div>
              </div>
            )}

            {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContent;
