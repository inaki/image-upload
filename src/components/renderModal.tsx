import { ReactNode } from "react";
import ReactDOM from "react-dom";

type RenderModalProps = {
  children: ReactNode;
  id: string;
};

export const RenderModal = (props: RenderModalProps) => {
  return ReactDOM.createPortal(
    props.children,
    document.getElementById(props.id)!
  );
};
