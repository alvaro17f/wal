import "./App.css";
import { Settings } from "@/views/Settings/Settings";
import { Navbar } from "@/components/Navbar/Navbar";
import { Wallpapers } from "@/components/Wallpapers/Wallpapers";

export const App = () => {
  return (
    <main id="app">
      <Navbar />
      <Wallpapers />
      <Settings />
    </main>
  );
};
