import UploadIcon from "./icons/upload";
import Button from "./shared/button";

interface AddImageProps {
  handleOpen: (params: any) => any;
}

const AddImage = ({ handleOpen }: AddImageProps) => {
  return (
    <Button handleClick={() => handleOpen(true)} variant="secondary">
      Add New Image <UploadIcon className="ml-2" />
    </Button>
  );
};

export default AddImage;
