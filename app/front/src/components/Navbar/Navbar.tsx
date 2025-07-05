import { useWallpapers } from "@/hooks/useWallpapers";
import "./Navbar.css";

export const Navbar = () => {
  const { setRandomWallpaper } = useWallpapers();
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
      <button onClick={setRandomWallpaper}>random</button>
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
