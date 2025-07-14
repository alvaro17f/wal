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
  DELETE_VALUE: "DELETE_VALUE",
  EDIT_VALUE: "EDIT_VALUE",
  HIDE_AND_CLEAR_INPUT: "HIDE_AND_CLEAR_INPUT",
  RESET_CURRENT_VALUE: "RESET_CURRENT_VALUE",
  SAVE_INPUT_VALUE: "SAVE_INPUT_VALUE",
  SET_INITIAL_VALUE: "SET_INITIAL_VALUE",
  SHOW_INPUT: "SHOW_INPUT",
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
      type: typeof ActionKind.EDIT_VALUE;
      payload: { category: string; previousValue: string; newValue: string };
    }
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
  handleCancelButton: () => void;
  handleCancelSave: (e: MouseEvent<HTMLButtonElement>) => void;
  handleDelete: (e: MouseEvent<HTMLButtonElement>, value: string) => void;
  handleEdit: (
    e: MouseEvent<HTMLSpanElement> | KeyboardEvent,
    newValue: string,
  ) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSave: (e: MouseEvent<HTMLButtonElement> | KeyboardEvent) => void;
  handleSaveButton: () => Promise<void>;
  handleShowInput: (e: MouseEvent<HTMLButtonElement>) => void;
};
