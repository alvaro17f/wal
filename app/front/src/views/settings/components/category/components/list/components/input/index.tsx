import type { KeyboardEvent } from "react";
import { useSettings } from "@/context/settings";
import { Categories, type Config } from "@/context/settings/types";
import type { CategoryType } from "@/views/settings/components/category/types";

export const Input = ({ category }: CategoryType) => {
  const { handleCancelSave, handleInputChange, handleSave, state } =
    useSettings();

  const handlePlaceholder: Record<keyof Config, string> = {
    [Categories.PATHS]: "/path/to/wallpapers/folder",
    [Categories.COMMANDS]: "command with {} to be replaced",
  };

  const handleInputKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSave(event);
    }
  };

  return (
    <li className="element">
      <div>
        <input
          id={category}
          className="input"
          autoFocus
          type="text"
          placeholder={handlePlaceholder[category]}
          value={state[category].inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
      </div>
      <div>
        <button id={category} onClick={handleSave}>
          ✅
        </button>
        <button id={category} onClick={handleCancelSave}>
          ❌
        </button>
      </div>
    </li>
  );
};
