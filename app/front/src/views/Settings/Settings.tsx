import "./Settings.css";
export const Settings = () => {
  return (
    <dialog id="settings">
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
