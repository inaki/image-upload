import React, { ReactNode, useContext, useReducer, useState } from "react";
import { GlobalContext } from "../GlobalProvider";
import dndReducer from "../reducers/dndReducer";

type DragAndDropProps = {
  children: ReactNode;
  handleChange: (params: any) => any;
};

const DragAndDrop = ({ children, handleChange }: DragAndDropProps) => {
  const [inZone, setInZone] = useState(false);
  const context = useContext(GlobalContext);
  const [state, dispatch] = useReducer(dndReducer, context);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_DROP_DEPTH", dropDepth: context.dropDepth + 1 });
    setInZone(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_DROP_DEPTH", dropDepth: context.dropDepth - 1 });
    if (context.dropDepth > 0) {
      return;
    }
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
    setInZone(false);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setInZone(false);
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
    handleChange(e.dataTransfer.files);
  };
  return (
    <div
      className={`dnd-zone flex justify-center items-center h-40 border-dashed border-2 border-black ${
        inZone ? "bg-yellow-100" : null
      }`}
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragEnter={(e) => handleDragEnter(e)}
      onDragLeave={(e) => handleDragLeave(e)}
    >
      <div
        className={`flex flex-col text-center justify-center items-center ${
          inZone ? "hidden" : null
        }`}
      >
        {children}
      </div>
    </div>
  );
};
export default DragAndDrop;
