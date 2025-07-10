import { useSettings } from "@/context/settings";
import { Input } from "./components/input";
import type { CategoryType } from "@/views/settings/components/category/types";

export const List = ({ category }: CategoryType) => {
  const { handleDelete, state } = useSettings();

  return (
    <ul>
      {state[category]?.currentValue?.sort().map((element: string) => (
        <li key={element} className="element">
          <span>{element} </span>
          <div>
            <button id={category} onClick={(e) => handleDelete(e, element)}>
              ❌
            </button>
          </div>
        </li>
      ))}
      {state[category].showInput && <Input category={category} />}
    </ul>
  );
};
