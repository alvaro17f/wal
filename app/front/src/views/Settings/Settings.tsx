import { type MouseEvent, type ChangeEvent, useState } from "react";
import { type Config } from "./hooks/useConfig.tsx";
import "./Settings.css";
import { useConfig } from "./hooks/useConfig.tsx";

const Categories = {
  PATHS: "paths",
  COMMANDS: "commands",
} as const;

type CategoryItem = {
  [key: string]: string;
};

type ShowInput = {
  [key: string]: boolean;
};

export const Settings = () => {
  const { config, setConfig, initialState } = useConfig();

  const [newCategoryItem, setNewCategoryItem] = useState<CategoryItem>({
    [Categories.PATHS]: "",
    [Categories.COMMANDS]: "",
  });

  const [showInput, setShowInput] = useState<ShowInput>({
    [Categories.PATHS]: false,
    [Categories.COMMANDS]: false,
  });

  const handleShowInput = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    const category = button?.id;
    setShowInput((prev: ShowInput) => ({
      ...prev,
      [category]: true,
    }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    const category = input?.id;
    const value = e.target.value;

    setNewCategoryItem((prev: CategoryItem) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleSaveNewCategoryItem = (e: MouseEvent<HTMLButtonElement>) => {
    const input = e.target as HTMLInputElement;
    const category = input?.id as keyof Config;

    setConfig((config: Config | undefined) => {
      if (!config) return;
      if (!newCategoryItem[category]) return config;
      if (config[category].includes(newCategoryItem[category])) return config;

      return {
        ...config,
        [category]: [...config[category], newCategoryItem[category]],
      };
    });

    handleHideAndClearInput(e);
  };

  const handleClearNewItem = (category: string) => {
    setNewCategoryItem((prev: CategoryItem) => ({
      ...prev,
      [category]: "",
    }));
  };

  const handleHideInput = (category: string) => {
    setShowInput((prev: ShowInput) => ({
      ...prev,
      [category]: false,
    }));
  };

  const handleHideAndClearInput = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    const category = button?.id;

    handleHideInput(category);
    handleClearNewItem(category);
  };

  const handleCancelButton = () => {
    return initialState && setConfig(initialState);
  };

  const handleDeleteCategoryItem = (element: string) => {
    setConfig((config: Config | undefined) => {
      if (!config) return;

      return {
        ...config,
        paths: [...config.paths.filter((p: string) => p !== element)],
        commands: [...config.commands.filter((c: string) => c !== element)],
      };
    });
  };

  return (
    <dialog id="settings">
      <section className="content">
        <button
          className="close-button"
          /*// @ts-expect-error commandfor */
          commandfor="settings"
          command="close"
        >
          X
        </button>

        <h2 className="title">WAL Settings</h2>
        <div className="categories">
          <h3 className="category">
            <span>{Categories.PATHS}</span>
            <div>
              <button id={Categories.PATHS} onClick={handleShowInput}>
                +
              </button>
            </div>
          </h3>
          <ul>
            {config?.paths?.sort().map((path: string) => (
              <>
                <li key={path} className="element">
                  <span>{path} </span>
                  <div>
                    <button onClick={() => handleDeleteCategoryItem(path)}>
                      ❌
                    </button>
                  </div>
                </li>
              </>
            ))}
            {showInput[Categories.PATHS] && (
              <li className="element">
                <div>
                  <input
                    id={Categories.PATHS}
                    type="text"
                    placeholder="/path/to/wallpapers/folder"
                    value={newCategoryItem[Categories.PATHS]}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <button
                    id={Categories.PATHS}
                    onClick={handleSaveNewCategoryItem}
                  >
                    ✅
                  </button>
                  <button
                    id={Categories.PATHS}
                    onClick={handleHideAndClearInput}
                  >
                    ❌
                  </button>
                </div>
              </li>
            )}
          </ul>
          <h3 className="category">
            <span>{Categories.COMMANDS}</span>
            <div>
              <button id={Categories.COMMANDS} onClick={handleShowInput}>
                +
              </button>
            </div>
            <i className="info">
              {"{}"} will be replaced with the wallpaper path
            </i>
          </h3>
          <ul>
            {config?.commands?.sort().map((command: string) => (
              <li key={command} className="element">
                <span>{command}</span>
                <div>
                  <button onClick={() => handleDeleteCategoryItem(command)}>
                    ❌
                  </button>
                </div>
              </li>
            ))}
            {showInput[Categories.COMMANDS] && (
              <li className="element">
                <div>
                  <input
                    id={Categories.COMMANDS}
                    type="text"
                    placeholder="command using {} to replace wallpaper path"
                    value={newCategoryItem[Categories.COMMANDS]}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <button
                    id={Categories.COMMANDS}
                    onClick={handleSaveNewCategoryItem}
                  >
                    ✅
                  </button>
                  <button
                    id={Categories.COMMANDS}
                    onClick={handleHideAndClearInput}
                  >
                    ❌
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
        <button
          className="cancel-button"
          /*// @ts-expect-error commandfor */
          commandfor="settings"
          command="close"
          onClick={handleCancelButton}
        >
          CANCEL
        </button>
        <button
          className="save-button"
          /*// @ts-expect-error commandfor */
          commandfor="settings"
          command="close"
          onClick={() => console.debug("save")}
        >
          SAVE
        </button>
      </section>
    </dialog>
  );
};
