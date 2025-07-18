import { useState } from "react";
import type { State } from "./types";
import { StateContext } from ".";

const initialState: State = {
  filterQuery: "",
  isLoading: false,
  theme: "light",
  tooltipText: null,
};

export const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<State>(initialState);

  return (
    <StateContext.Provider value={{ state, setState }}>
      {children}
    </StateContext.Provider>
  );
};
