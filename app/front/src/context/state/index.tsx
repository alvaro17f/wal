import { createContext, useContext } from "react";
import type { StateContextValue } from "./types";

export const StateContext = createContext<StateContextValue | undefined>(
  undefined,
);

export const useStateContext = (): StateContextValue => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
