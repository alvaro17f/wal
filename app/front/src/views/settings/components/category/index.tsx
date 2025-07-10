import { Title } from "./components/title";
import { List } from "./components/list";
import type { CategoryType } from "./types";

export const Category = ({ category }: CategoryType) => {
  return (
    <>
      <Title category={category} />
      <List category={category} />
    </>
  );
};
