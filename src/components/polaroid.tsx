type PolaroidProps = {
  title: string;
  imageSource: string;
};
const Polaroid = ({ title, imageSource }: PolaroidProps) => {
  const formats = [".png", ".jpg", ".jpeg"];
  const processedTitle = title.replace(new RegExp(formats.join("|")), "");
  processedTitle.replace(new RegExp(formats.join("|")), "");

  return (
    <div className="h-60 w-48 p-2 border-solid border-1 border-black-100 shadow-lg shadow-black-500/40">
      <img
        className="h-44 w-44 overflow-hidden"
        alt="random img"
        src={imageSource}
      />
      <p className="pt-2 pb-1 text-ellipsis">{processedTitle}</p>
    </div>
  );
};

export default Polaroid;
