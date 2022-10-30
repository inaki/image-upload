export const initialDndState = {
  dropDepth: 0,
  inDropZone: false,
  fileList: "",
};

export type State = {
  dropDepth?: number;
  inDropZone: boolean;
  fileList?: string;
};

export type Action =
  | { type: "SET_DROP_DEPTH"; dropDepth: number }
  | { type: "SET_IN_DROP_ZONE"; inDropZone: boolean }
  | { type: "ADD_FILE_TO_LIST"; files: string };

const dndReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_DROP_DEPTH":
      return { ...state, dropDepth: action.dropDepth };
    case "SET_IN_DROP_ZONE":
      return { ...state, inDropZone: action.inDropZone };
    case "ADD_FILE_TO_LIST":
      return { ...state, fileList: state?.fileList?.concat(action.files) };
    default:
      return state;
  }
};

export default dndReducer;
