import { useSettings } from "@/context/settings";
import { Input } from "./components/input";
import type { CategoryType } from "@/views/settings/components/category/types";

export const List = ({ category }: CategoryType) => {
  const { handleEdit, handleDelete, state } = useSettings();

  const edit = (e: React.MouseEvent<HTMLSpanElement>) => {
    const userInput = prompt("Please enter a value:");
    return userInput !== null && handleEdit(e, userInput);
  };

  return (
    <ul>
      {state[category]?.currentValue?.sort().map((element: string) => (
        <li key={element} className="element">
          <span id={category} onClick={edit}>
            {element}
          </span>
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
