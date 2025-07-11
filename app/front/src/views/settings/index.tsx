import "./styles.css";
import { useSettings } from "@/context/settings";
import { Category } from "./components/category";
import { useConfig } from "./hooks/useConfig";

export const Settings = () => {
  useConfig();
  const { Categories, handleSaveButton, handleCancelButton } = useSettings();

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
          {Object.values(Categories).map((category) => (
            <Category category={category} key={category} />
          ))}
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
