import { useSettings } from "@/context/Settings/Context";
import { Categories, type Config } from "@/context/Settings/Types";
import type { CategoryType } from "../../Types";

export const Input = ({ category }: CategoryType) => {
  const { handleCancelSave, handleInputChange, handleSave, state } =
    useSettings();

  const handlePlaceholder: Record<keyof Config, string> = {
    [Categories.PATHS]: "/path/to/wallpapers/folder",
    [Categories.COMMANDS]: "command with {} to be replaced",
  };

  return (
    <li className="element">
      <div>
        <input
          id={category}
          type="text"
          placeholder={handlePlaceholder[category]}
          value={state[category].inputValue}
          onChange={handleInputChange}
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
