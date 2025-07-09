import { useSettings } from "@/context/Settings/Context";
import { Input } from "./Input/Input";
import type { CategoryType } from "../Types";

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
