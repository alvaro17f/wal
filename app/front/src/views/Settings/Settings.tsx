import { useConfig } from "./hooks/useConfig.tsx";
import "./Settings.css";
import { useSettings } from "@/context/Settings/Context.tsx";

export const Settings = () => {
  useConfig();
  const {
    Categories,
    state,
    handleDelete,
    handleInputChange,
    handleSave,
    handleSaveButton,
    handleCancelButton,
    handleCancelSave,
    handleShowInput,
  } = useSettings();

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
            {state[Categories.PATHS]?.currentValue
              ?.sort()
              .map((path: string) => (
                <li key={path} className="element">
                  <span>{path} </span>
                  <div>
                    <button
                      id={Categories.PATHS}
                      onClick={(e) => handleDelete(e, path)}
                    >
                      ❌
                    </button>
                  </div>
                </li>
              ))}
            {state[Categories.PATHS].showInput && (
              <li className="element">
                <div>
                  <input
                    id={Categories.PATHS}
                    type="text"
                    placeholder="/path/to/wallpapers/folder"
                    value={state[Categories.PATHS].inputValue}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <button id={Categories.PATHS} onClick={handleSave}>
                    ✅
                  </button>
                  <button id={Categories.PATHS} onClick={handleCancelSave}>
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
            {state[Categories.COMMANDS].currentValue
              ?.sort()
              .map((command: string) => (
                <li key={command} className="element">
                  <span>{command}</span>
                  <div>
                    <button
                      id={Categories.COMMANDS}
                      onClick={(e) => handleDelete(e, command)}
                    >
                      ❌
                    </button>
                  </div>
                </li>
              ))}
            {state[Categories.COMMANDS].showInput && (
              <li className="element">
                <div>
                  <input
                    id={Categories.COMMANDS}
                    type="text"
                    placeholder="command using {} to replace wallpaper path"
                    value={state[Categories.COMMANDS].inputValue}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <button id={Categories.COMMANDS} onClick={handleSave}>
                    ✅
                  </button>
                  <button id={Categories.COMMANDS} onClick={handleCancelSave}>
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
          onClick={handleSaveButton}
        >
          SAVE
        </button>
      </section>
    </dialog>
  );
};
