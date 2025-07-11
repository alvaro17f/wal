import {
  useReducer,
  type ChangeEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { SettingsContext } from "./context";
import { settingsReducer, initialState } from "./reducer";
import {
  Categories,
  ActionKind,
  type SettingsContextKind,
  type SettingsProviderProps,
  type State,
  type Config,
} from "./types";

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [state, dispatch] = useReducer(settingsReducer, initialState);

  const handleShowInput = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    const category = button?.id;
    dispatch({ type: ActionKind.SHOW_INPUT, payload: { category } });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    const category = input?.id;
    const value = e.target.value;
    dispatch({
      type: ActionKind.CHANGE_INPUT_VALUE,
      payload: { category, value },
    });
  };

  const handleSave = (e: MouseEvent<HTMLButtonElement> | KeyboardEvent) => {
    const input = e.target as HTMLInputElement;
    const category = input?.id as keyof Config;

    if (state[category].currentValue.includes(state[category].inputValue))
      return state[category].currentValue;

    dispatch({
      type: ActionKind.SAVE_INPUT_VALUE,
      payload: { category, value: state[category].inputValue },
    });

    handleCancelSave(e);
  };

  const handleCancelSave = (
    e: MouseEvent<HTMLButtonElement> | KeyboardEvent,
  ) => {
    const button = e.target as HTMLButtonElement;
    const category = button?.id;
    dispatch({ type: ActionKind.HIDE_AND_CLEAR_INPUT, payload: { category } });
  };

  const handleCancelButton = () => {
    dispatch({ type: ActionKind.RESET_CURRENT_VALUE });
  };

  const handleDelete = (e: MouseEvent<HTMLButtonElement>, value: string) => {
    const button = e.target as HTMLButtonElement;
    const category = button?.id;
    dispatch({ type: ActionKind.DELETE_VALUE, payload: { category, value } });
  };

  const handleSaveButton = async () => {
    const newState = Object.entries(state).reduce<{ [key: string]: string[] }>(
      (newstate, [key, value]) => {
        const typedValue = value as State[keyof State];
        newstate[key] = typedValue.currentValue;
        return newstate;
      },
      {},
    );

    await webui.save_config(JSON.stringify(newState));
  };

  const value: SettingsContextKind = {
    state,
    dispatch,
    Categories,
    handleCancelButton,
    handleSave,
    handleCancelSave,
    handleDelete,
    handleSaveButton,
    handleInputChange,
    handleShowInput,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
