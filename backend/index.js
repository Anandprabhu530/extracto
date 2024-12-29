const express = require("express");
const Vision = require("@google-cloud/vision");
const vision = new Vision.ImageAnnotatorClient();
const {Storage} = require("@google-cloud/storage");

const app = express();
const storage = new Storage();

app.use(express.json());

const BUCKET_NAME = "text-extraction-raw-bucket";

// ERROR_CODES
const SUCCESS_CODE = 0;
const NO_TEXT_ERROR_CODE = 1;
const INTERNAL_ERROR_CODE = 2;
const FILE_NOT_FOUND_ERROR_CODE = 3;

app.get("/analyze", async (req, res) => {
  const {fileName} = req.body;

  const fileURL = `gs://${BUCKET_NAME}/${fileName}`;

  const bucket = storage.bucket(BUCKET_NAME);
  const file = bucket.file(fileName);

  try {
    // check it file exists, if not return not found
    const [exists] = await file.exists();
    if (!exists) {
      res.status(400).json({statusCode: FILE_NOT_FOUND_ERROR_CODE, data: null});
      return;
    }

    // extract text from the visionAPI
    const [textDetections] = await vision.textDetection(fileURL);
    const [annotation] = textDetections.textAnnotations;
    const text = annotation ? annotation.description.trim() : "";

    // delete the file
    await storage.bucket(BUCKET_NAME).file(fileName).delete();

    // If there is no text in the file
    if (text.length === 0) {
      res.status(400).json({statusCode: NO_TEXT_ERROR_CODE, data: null});
      return;
    }

    // return the extracted datas
    res.status(200).json({statusCode: SUCCESS_CODE, data: text});
  } catch (err) {
    // If an error occurs catch and send the internal error code
    console.log(`An error occured ${err}`);
    res.status(500).json({statusCode: INTERNAL_ERROR_CODE, data: null});
  }
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
