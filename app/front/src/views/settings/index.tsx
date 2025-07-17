import "./styles.css";
import { useConfig } from "@/hooks/useConfig";

export const Settings = () => {
  const { config, setConfig, handleSubmit, initialConfig } = useConfig();

  return (
    <dialog id="settings">
      <h2 className="title">WAL Settings</h2>
      <form onSubmit={handleSubmit}>
        <button
          type="button"
          className="close-button"
          /*// @ts-expect-error commandfor */
          commandfor="settings"
          command="close"
        >
          X
        </button>
        <ul>
          <h3>PATHS</h3>
          {config?.paths.map((path) => (
            <li key={path}>
              <input name={"path"} defaultValue={path} />
              <button
                type="button"
                className="trash-button"
                onClick={() => {
                  setConfig({
                    ...config,
                    paths: config.paths.filter((p) => p !== path),
                  });
                }}
              >
                🗑️
              </button>
            </li>
          ))}
          <li>
            <button
              type="button"
              className="add-button"
              onClick={() =>
                setConfig({
                  ...config!,
                  paths: [...config!.paths, ""],
                })
              }
            >
              add a path
            </button>
          </li>
          <h3>COMMANDS</h3>
          {config?.commands.map((command) => (
            <li key={command}>
              <input name={"command"} defaultValue={command} />
              <button
                type="button"
                className="trash-button"
                onClick={() => {
                  setConfig({
                    ...config,
                    commands: config.commands.filter((c) => c !== command),
                  });
                }}
              >
                🗑️
              </button>
            </li>
          ))}
          <li>
            <button
              type="button"
              className="add-button"
              onClick={() => {
                setConfig({
                  ...config!,
                  commands: [...config!.commands, ""],
                });
              }}
            >
              add a command
            </button>
          </li>
        </ul>
        <button
          type="button"
          className="cancel-button"
          /*// @ts-expect-error commandfor */
          commandfor="settings"
          command="close"
          onClick={() => setConfig(initialConfig)}
        >
          CANCEL
        </button>
        <button type="submit" className="save-button">
          SAVE
        </button>
      </form>
    </dialog>
  );
};
