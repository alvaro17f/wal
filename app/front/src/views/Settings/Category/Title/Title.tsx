import { useSettings } from "@/context/Settings/Context";
import { Categories } from "@/context/Settings/Types";
import type { CategoryType } from "../Types";

export const Title = ({ category }: CategoryType) => {
  const { handleShowInput } = useSettings();

  return (
    <h3 className="category">
      <span>{category}</span>
      <div>
        <button id={category} onClick={handleShowInput}>
          +
        </button>
      </div>
      {category === Categories.COMMANDS && (
        <i className="info">{"{}"} will be replaced with the wallpaper path</i>
      )}
    </h3>
  );
};
