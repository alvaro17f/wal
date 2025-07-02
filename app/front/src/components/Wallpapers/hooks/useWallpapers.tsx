import { useEffect, useState } from "react";

export const useWallpapers = () => {
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
    }, 100);
  }, []);

  return { wallpapers };
};
