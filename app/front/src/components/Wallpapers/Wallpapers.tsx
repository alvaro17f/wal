import "./Wallpapers.css";
import { useWallpapers } from "./hooks/useWallpapers";

export const Wallpapers = () => {
  const { wallpapers, setWallpaper } = useWallpapers();

  const getFileName = (wallpaperPath: string) => wallpaperPath.split("/").pop();

  return (
    <div className="wallpapers">
      {wallpapers?.map((wallpaper, idx) => {
        return (
          <img
            key={idx}
            className="wallpaper"
            onClick={() => setWallpaper(wallpaper)}
            src={getFileName(wallpaper)}
            alt={`wallpaper_${idx}`}
            height={200}
            width={300}
          />
        );
      })}
    </div>
  );
};
