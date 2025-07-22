import { useStateContext } from "@/context/state";
import { useEffect, useMemo, useState } from "react";

export const useWallpapers = () => {
	const [allWallpapers, setAllWallpapers] = useState<string[]>([]);
	const { state } = useStateContext();

	const getWallpapers = async () => {
		const result: string = await webui.get_wallpapers();
		const walls = result.split("###").filter(Boolean);
		setAllWallpapers(walls);
	};

	const wallpapers = useMemo(
		() =>
			(allWallpapers || []).filter((p) =>
				p.toLowerCase().includes(state.filterQuery.toLowerCase()),
			),
		[allWallpapers, state.filterQuery],
	);

	const setWallpaper = (wallpaper: string) => {
		webui.set_wallpaper(wallpaper);
	};

	const setRandomWallpaper = () => {
		const randomWallpaper = Math.floor(Math.random() * wallpapers.length);
		setWallpaper(wallpapers[randomWallpaper]);
	};

	useEffect(() => {
		setTimeout(() => {
			getWallpapers();
		}, 100);
	}, []);

	return {
		allWallpapers,
		setRandomWallpaper,
		setWallpaper,
		wallpapers,
	};
};
