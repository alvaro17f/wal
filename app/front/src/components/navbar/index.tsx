import "./styles.css";
import { useWallpapers } from "@/hooks/useWallpapers";
import { useIcons } from "@/hooks/useIcons";

export const Navbar = () => {
  const { setRandomWallpaper } = useWallpapers();
  const { Exit, Random, Settings } = useIcons();
  return (
    <nav id="nav">
      <button
        className="nav-button"
        onClick={() => {
          // @ts-expect-error webui
          webui.exit_app();
        }}
      >
        <img src={Exit} alt="exit" />
      </button>
      <button className="nav-button" onClick={setRandomWallpaper}>
        <img src={Random} alt="random" />
      </button>
      <button
        className="nav-button"
        /*// @ts-expect-error commandfor */
        commandfor="settings"
        command="show-modal"
      >
        <img src={Settings} alt="settings" />
      </button>
    </nav>
  );
};
