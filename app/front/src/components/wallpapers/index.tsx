import "./styles.css";
import { useStateContext } from "@/context/state";
import { useWallpapers } from "@/hooks/useWallpapers";

export const Wallpapers = () => {
	const { wallpapers, setWallpaper } = useWallpapers();
	const { state, setState } = useStateContext();

	return (
		<section id="wallpapers">
			{wallpapers.map((wallpaper) => {
				const file = wallpaper.split("/").pop() ?? wallpaper;

				return (
					<img
						key={wallpaper}
						className="wallpaper"
						onClick={() => setWallpaper(wallpaper)}
						src={file}
						alt={file}
						height={200}
						width={300}
						onMouseEnter={() =>
							setState((s) => ({ ...s, tooltipText: wallpaper }))
						}
						onMouseLeave={() => setState((s) => ({ ...s, tooltipText: null }))}
						onKeyDown={(e) => e.key === "Enter" && setWallpaper(wallpaper)}
						title={state.tooltipText ?? ""}
					/>
				);
			})}
		</section>
	);
};
