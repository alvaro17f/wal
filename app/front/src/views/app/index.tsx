import "./styles.css";
import { Settings } from "@/views/settings";
import { Navbar } from "@/components/navbar";
import { Wallpapers } from "@/components/wallpapers";
import { useWallpapers } from "@/hooks/useWallpapers";
import { Welcome } from "@/components/welcome";

export const App = () => {
  const { wallpapers } = useWallpapers();

  const shouldShowWelcome = !wallpapers?.length;

  return (
    <main id="app">
      <Navbar />
      {shouldShowWelcome ? <Welcome /> : <Wallpapers />}
      <Settings />
    </main>
  );
};
