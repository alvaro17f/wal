import "./Settings.css";
import { useSettings } from "./hooks/useSettings";

export const Settings = () => {
  const { config } = useSettings();

  return (
    <dialog id="settings">
      <h2>Settings</h2>
      <h3>Paths:</h3>
      <ul>
        {config?.paths?.map((path: string) => (
          <li>{path}</li>
        ))}
      </ul>
      <h3>Command:</h3>
      <i>{"{}"} will be replaced with the selected wallpaper</i>
      <div>{config?.command}</div>
      <button
        /*// @ts-expect-error commandfor */
        commandfor="settings"
        command="close"
      >
        close
      </button>
    </dialog>
  );
};
