import "./Wallpapers.css";
import { useWallpapers } from "./hooks/useWallpapers";

export const Wallpapers = () => {
  const { wallpapers } = useWallpapers();

  return (
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
  );
};
