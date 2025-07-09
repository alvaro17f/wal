import { Categories, type Action, type State, ActionKind } from "./Types";

export const initialState: State = {
  [Categories.PATHS]: {
    initialValue: [],
    currentValue: [],
    inputValue: "",
    showInput: false,
  },
  [Categories.COMMANDS]: {
    initialValue: [],
    currentValue: [],
    inputValue: "",
    showInput: false,
  },
};

export const settingsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionKind.SHOW_INPUT:
      return {
        ...state,
        [action.payload?.category]: {
          ...state[action.payload?.category],
          showInput: true,
        },
      };
    case ActionKind.CHANGE_INPUT_VALUE:
      return {
        ...state,
        [action.payload?.category]: {
          ...state[action.payload?.category],
          inputValue: action.payload?.value,
        },
      };
    case ActionKind.SET_INITIAL_VALUE:
      return {
        ...state,
        [action.payload?.category]: {
          ...state[action.payload?.category],
          initialValue: action.payload?.value,
          currentValue: action.payload?.value,
        },
      };

    case ActionKind.RESET_CURRENT_VALUE:
      return {
        ...state,
        ...Object.keys(state).reduce((newState, category) => {
          const categoryKey = category as keyof State;
          newState[categoryKey] = {
            ...state[categoryKey],
            currentValue: state[categoryKey].initialValue,
          };
          return newState;
        }, {} as State),
      };
    case ActionKind.DELETE_VALUE:
      return {
        ...state,
        [action.payload?.category]: {
          ...state[action.payload?.category],
          currentValue: state[action.payload?.category].currentValue.filter(
            (value) => value !== action.payload?.value,
          ),
        },
      };
    case ActionKind.SAVE_INPUT_VALUE:
      return {
        ...state,
        [action.payload?.category]: {
          ...state[action.payload?.category],
          currentValue: [
            ...state[action.payload?.category].currentValue,
            action.payload?.value,
          ],
        },
      };
    case ActionKind.HIDE_AND_CLEAR_INPUT:
      return {
        ...state,
        [action.payload?.category]: {
          ...state[action.payload?.category],
          inputValue: "",
          showInput: false,
        },
      };
    default:
      return state;
  }
};
