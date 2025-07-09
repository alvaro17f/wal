import { createContext, useContext } from "react";
import type { SettingsContextKind } from "./Types";

export const SettingsContext = createContext<SettingsContextKind>(
  {} as SettingsContextKind,
);

export const useSettings = () => useContext(SettingsContext);
