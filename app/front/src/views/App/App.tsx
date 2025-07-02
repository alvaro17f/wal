import "./App.css";

import { useEffect, useState } from "react";
import { Settings } from "@/views/Settings/Settings";
import { Navbar } from "@/components/Navbar/Navbar";

export const App = () => {
  const [wallpapers, setWallpapers] = useState<string[]>([]);

  const getWallpapers = async () => {
    // @ts-expect-error webui
    const result: string = await webui.get_wallpapers();
    const walls = result.split(/\s+/).filter(Boolean);
    setWallpapers(walls);
  };

  useEffect(() => {
    setTimeout(() => {
      getWallpapers();
    }, 500);
  }, []);

  return (
    <main id="app">
      <Navbar />
      <div className="wallpapers">
        {wallpapers?.map((wallpaper, idx) => {
          return (
            <img
              key={idx}
              className="wallpaper"
              src={wallpaper}
              alt={`wallpaper_${idx}`}
              height={200}
              width={300}
            />
          );
        })}
      </div>
      <Settings />
    </main>
  );
};
