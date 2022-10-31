import DragAndDrop from "./dragAndDrop";
import CloseIcon from "./icons/close";
import Button from "./shared/button";
import { useRef, useState } from "react";
import ReactS3Client from "react-aws-s3-typescript";
import LoadingIcon from "./icons/loading";
import { truncate } from "fs";

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

interface FilesProps {
  name: string;
  completed: boolean;
  id: number;
}

const UploadForm = ({ handleClose }: UploadFormProps) => {
  const [uploading, setUploading] = useState<FilesProps[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleUpload = async (files: { [index: number]: File }) => {
    const filesToUpload: FilesProps[] = [];

    for (let i = 0; i < Object.keys(files).length; i++) {
      filesToUpload.push({ name: files[i].name, completed: false, id: i });
    }

    for (let i = 0; i < filesToUpload.length; i++) {
      await S3Client.uploadFile(files[i], files[i].name)
        .then((data) => {
          filesToUpload[i] = { name: data.key, completed: true, id: i };
          setUploading((uploading) => [...filesToUpload]);
          console.log(data);
        })
        .catch((err) => console.error(err));
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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

        {uploading.length ? (
          <div>
            {uploading.map((item, index) => {
              return (
                <div className="flex justify-start" key={item.name + index}>
                  <span className="inline-block">
                    {item.name} : id_{item.id}
                  </span>
                  {item.completed ? (
                    <div className="ml-10 text-emerald-500">completed</div>
                  ) : (
                    <div className="ml-10 text-fuchsia-500 animate-pulse flex">
                      <span>uploading...</span>
                      <LoadingIcon className="w-4 h-4 mt-3 ml-5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : null}

        {!uploading.length ? (
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
        ) : null}
      </div>
    </div>
  );
};

export default UploadForm;
