import { useSettings } from "@/context/settings";
import { Categories } from "@/context/settings/types";
import type { CategoryType } from "@/views/settings/components/category/types";

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
