import { createContext, useContext } from "react";
import type { SettingsContextKind } from "./Provider";

export const SettingsContext = createContext<SettingsContextKind>(
  {} as SettingsContextKind,
);

export const useSettings = () => useContext(SettingsContext);
