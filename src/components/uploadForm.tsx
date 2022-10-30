import DragAndDrop from "./dragAndDrop";
import CloseIcon from "./icons/close";
import Button from "./shared/button";
import { useRef, useState } from "react";
import ReactS3Client from "react-aws-s3-typescript";
import LoadingIcon from "./icons/loading";

const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME || "",
  region: process.env.REACT_APP_REGION || "",
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID || "",
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY || "",
  s3Url: process.env.REACT_APP_S3_URL || "",
};

const S3Client = new ReactS3Client(config);

interface UploadFormProps {
  handleClose: (params: any) => any;
}

const UploadForm = ({ handleClose }: UploadFormProps) => {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleUpload = (files: { [index: number]: File }) => {
    for (let i = 0; i < Object.keys(files).length; i++) {
      S3Client.uploadFile(files[i], files[i].name)
        .then((data) => {
          setLoading(false);
          handleClose(false);
          return data;
        })
        .catch((err) => console.error(err));
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const fileObj = e.target.files;
    if (!fileObj) {
      return;
    }
    handleUpload(fileObj);
  };

  return (
    <div className="flex justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full backdrop-opacity-10 backdrop-invert bg-white/80">
      <div className="self-center relative bg-white border-2 border-black p-4 w-full max-w-2xl h-full md:h-auto shadow-md shadow-gray-900">
        <button className="float-right" onClick={() => handleClose(false)}>
          <CloseIcon />
        </button>
        <h2 className="font-bold text-2xl mb-4">Upload Your Images</h2>

        {loading ? (
          <div className="flex justify-start">
            <span className="inline-block">loading...</span>
            <LoadingIcon className="ml-10 mt-3" />
          </div>
        ) : (
          <DragAndDrop handleChange={handleUpload}>
            <label className="text-center">
              <input
                ref={inputRef}
                onChange={handleInput}
                type="file"
                multiple
                accept=".png, .jpg, .jpeg"
                id="fileID"
                hidden
              />
              <p className="mb-4">Choose images to upload (JPG, GIF and PNG)</p>
            </label>
            <Button variant="primary" handleClick={handleClick}>
              Upload
            </Button>
          </DragAndDrop>
        )}
      </div>
    </div>
  );
};

export default UploadForm;
