import {
  type ActionDispatch,
  type ChangeEvent,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";

export type Config = {
  commands: string[];
  paths: string[];
};

export const Categories = {
  PATHS: "paths",
  COMMANDS: "commands",
} as const;

export type State = {
  [key: string]: {
    initialValue: string[];
    currentValue: string[];
    inputValue: string;
    showInput: boolean;
  };
};

export const ActionKind = {
  CHANGE_INPUT_VALUE: "CHANGE_INPUT_VALUE",
  HIDE_AND_CLEAR_INPUT: "HIDE_AND_CLEAR_INPUT",
  SAVE_INPUT_VALUE: "SAVE_INPUT_VALUE",
  SET_INITIAL_VALUE: "SET_INITIAL_VALUE",
  SHOW_INPUT: "SHOW_INPUT",
  RESET_CURRENT_VALUE: "RESET_CURRENT_VALUE",
  DELETE_VALUE: "DELETE_VALUE",
} as const;

export type Action =
  | {
      type: typeof ActionKind.CHANGE_INPUT_VALUE;
      payload: { category: string; value: string };
    }
  | {
      type: typeof ActionKind.HIDE_AND_CLEAR_INPUT;
      payload: { category: string };
    }
  | {
      type: typeof ActionKind.SAVE_INPUT_VALUE;
      payload: { category: string; value: string };
    }
  | {
      type: typeof ActionKind.SET_INITIAL_VALUE;
      payload: { category: string; value: string[] };
    }
  | { type: typeof ActionKind.SHOW_INPUT; payload: { category: string } }
  | { type: typeof ActionKind.RESET_CURRENT_VALUE }
  | {
      type: typeof ActionKind.DELETE_VALUE;
      payload: { category: string; value: string };
    };

export type SettingsProviderProps = {
  children: ReactNode;
};

export type SettingsContextKind = {
  state: State;
  dispatch: ActionDispatch<[action: Action]>;
  Categories: typeof Categories;
  handleShowInput: (e: MouseEvent<HTMLButtonElement>) => void;
  handleSave: (e: MouseEvent<HTMLButtonElement> | KeyboardEvent) => void;
  handleCancelSave: (e: MouseEvent<HTMLButtonElement>) => void;
  handleCancelButton: () => void;
  handleDelete: (e: MouseEvent<HTMLButtonElement>, value: string) => void;
  handleSaveButton: () => Promise<void>;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
