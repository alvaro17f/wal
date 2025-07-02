import "./Navbar.css";

export const Navbar = () => {
  return (
    <nav id="nav">
      <button
        onClick={() => {
          // @ts-expect-error webui
          webui.exit_app();
        }}
      >
        Exit
      </button>
      <button
        /*// @ts-expect-error commandfor */
        commandfor="settings"
        command="show-modal"
      >
        settings
      </button>
    </nav>
  );
};
