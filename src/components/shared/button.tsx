import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  handleClick: (params: any) => any;
  variant?: string;
}

const Button = ({ handleClick, children, variant }: ButtonProps) => {
  let styleVariant = "";
  switch (variant) {
    case "primary":
      styleVariant = "bg-yellow-300 hover:bg-yellow-200 active:bg-yellow-400";
      break;
    case "secondary":
      styleVariant = "bg-black text-white hover:bg-gray-700 active:bg-black";
      break;
    default:
      styleVariant = "";
      break;
  }
  return (
    <button
      onClick={handleClick}
      className={`flex justify-center border-2 border-black font-semibold px-4 py-2 ${styleVariant}`}
    >
      {children}
    </button>
  );
};

export default Button;
