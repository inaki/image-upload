import { createContext, ReactNode } from "react";
import { initialDndState } from "./reducers/dndReducer";

type GlobalProviderProps = {
  children: ReactNode;
};

export const GlobalContext = createContext(initialDndState);

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  return (
    <GlobalContext.Provider value={initialDndState}>
      {children}
    </GlobalContext.Provider>
  );
};
