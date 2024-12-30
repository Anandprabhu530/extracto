import {getFunctions, httpsCallable} from "firebase/functions";
import {app} from "./firebase";

const functions = getFunctions(app);

const generateFileUploadURL = httpsCallable(functions, "generateFileUploadURL");

export async function uploadImage(file) {
  const response = await generateFileUploadURL({
    fileName: file.name,
    inputBucketName: "text-extraction-raw-bucket",
  });

  console.log(response);

  await fetch(response?.data?.url, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });

  return response;
}
