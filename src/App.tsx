import Polaroid from "./components/polaroid";
import AddImage from "./components/addImage";
import React, { useState, useEffect } from "react";
import { RenderModal } from "./components/renderModal";
import UploadForm from "./components/uploadForm";
import ReactS3Client from "react-aws-s3-typescript";

const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME || "",
  region: process.env.REACT_APP_REGION || "",
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID || "",
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY || "",
  s3Url: process.env.REACT_APP_S3_URL || "",
};

const S3Client = new ReactS3Client(config);

const App = () => {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    S3Client.listFiles()
      .then(({ data }) => {
        setImages(data.Contents);
      })
      .catch((err) => console.error(err));
  }, [open]);

  return (
    <React.Fragment>
      <RenderModal id="upload-form">
        {open && <UploadForm handleClose={setOpen} />}
      </RenderModal>
      <div className="container mx-auto p-8 flex flex-col h-screen">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold">Fantastic Images</h1>
          <AddImage handleOpen={setOpen} />
        </div>
        <div className="container flex flex-wrap justify-center overflow-auto gap-8 mt-10 mx-auto grow p-8 border-solid border-2 border-gray-600">
          {images.length ? (
            images.map((item, index) => {
              return (
                <Polaroid
                  key={index}
                  title={item["Key"]}
                  imageSource={item["publicUrl"]}
                />
              );
            })
          ) : (
            <div className="w-62 self-center animate-pulse text-yellow-300 text-center bg-neutral-800 px-10 py-5 border-box justify-self-center">
              Add your first images. Just click on <br />
              `Add a New Image` button!
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
