import { Title } from "./Title/Title";
import { List } from "./List/List";
import type { CategoryType } from "./Types";

export const Category = ({ category }: CategoryType) => {
  return (
    <>
      <Title category={category} />
      <List category={category} />
    </>
  );
};
