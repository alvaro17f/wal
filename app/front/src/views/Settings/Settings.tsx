import "./Settings.css";
import { useSettings } from "./hooks/useSettings";

export const Settings = () => {
  const { config } = useSettings();

  return (
    <dialog id="settings">
      <h2>Settings</h2>
      <ul>
        {config?.paths.map((path: string) => (
          <li>{path}</li>
        ))}
      </ul>
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
