import "./App.css";
import { Settings } from "@/views/Settings/Settings";
import { Navbar } from "@/components/Navbar/Navbar";
import { Wallpapers } from "@/components/Wallpapers/Wallpapers";
import { useWallpapers } from "@/hooks/useWallpapers";
import { Welcome } from "@/components/Welcome/Welcome";
import { SettingsProvider } from "@/context/Settings/Provider";

export const App = () => {
  const { wallpapers } = useWallpapers();

  const shouldShowWelcome = !wallpapers?.length;

  return (
    <main id="app">
      <Navbar />
      {shouldShowWelcome ? <Welcome /> : <Wallpapers />}
      <SettingsProvider>
        <Settings />
      </SettingsProvider>
    </main>
  );
};
