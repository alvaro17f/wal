import { type MouseEvent, type ChangeEvent, useState } from "react";
import { type Config } from "./hooks/useConfig.tsx";
import "./Settings.css";
import { useConfig } from "./hooks/useConfig.tsx";
import { Categories } from "./constants.ts";

const { commands, paths } = Categories;

export const Settings = () => {
  const { config, setConfig, initialState } = useConfig();

  type CategoryItem = {
    [key: string]: string;
  };

  const [newCategoryItem, setNewCategoryItem] = useState<CategoryItem>({
    [paths]: "",
    [commands]: "",
  });

  type ShowInput = {
    [key: string]: boolean;
  };

  const [showInput, setShowInput] = useState<ShowInput>({
    [paths]: false,
    [commands]: false,
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
            <span>paths</span>
            <div>
              <button id={paths} onClick={handleShowInput}>
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
            {showInput[paths] && (
              <li className="element">
                <div>
                  <input
                    id={paths}
                    type="text"
                    placeholder="/path/to/wallpapers/folder"
                    value={newCategoryItem[paths]}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <button id={paths} onClick={handleSaveNewCategoryItem}>
                    ✅
                  </button>
                  <button id={paths} onClick={handleHideAndClearInput}>
                    ❌
                  </button>
                </div>
              </li>
            )}
          </ul>
          <h3 className="category">
            <span>commands</span>
            <div>
              <button id={commands} onClick={handleShowInput}>
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
            {showInput[commands] && (
              <li className="element">
                <div>
                  <input
                    id={commands}
                    type="text"
                    placeholder="command using {} to replace wallpaper path"
                    value={newCategoryItem[commands]}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <button id={commands} onClick={handleSaveNewCategoryItem}>
                    ✅
                  </button>
                  <button id={commands} onClick={handleHideAndClearInput}>
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
