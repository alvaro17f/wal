import { useEffect, useState } from "react";

export const useWallpapers = () => {
  const [wallpapers, setWallpapers] = useState<string[]>([]);

  const getWallpapers = async () => {
    // @ts-expect-error webui
    const result: string = await webui.get_wallpapers();
    const walls = result.split(/\s+/).filter(Boolean);
    setWallpapers(walls);
  };

  const setWallpaper = async (wallpaper: string) => {
    // @ts-expect-error webui
    webui.set_wallpaper(wallpaper);
  };

  useEffect(() => {
    setTimeout(() => {
      getWallpapers();
    }, 100);
  }, []);

  return { wallpapers, setWallpaper };
};
