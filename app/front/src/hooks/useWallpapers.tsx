import { useStateContext } from '@/context/state';
import { useEffect, useMemo, useState } from 'react';

export const useWallpapers = () => {
	const [wallpapers, setWallpapers] = useState<string[]>([]);
	const { state } = useStateContext();

	const getWallpapers = async () => {
		const result: string = await webui.get_wallpapers();
		const walls = result.split(/\s+/).filter(Boolean);
		setWallpapers(walls);
	};

	const setWallpaper = (wallpaper: string) => {
		webui.set_wallpaper(wallpaper);
	};

	const setRandomWallpaper = () => {
		const randomWallpaper = Math.floor(Math.random() * wallpapers.length);
		setWallpaper(wallpapers[randomWallpaper]);
	};

	const filteredWallpapers = useMemo(
		() =>
			(wallpapers || []).filter(p =>
				p.toLowerCase().includes(state.filterQuery.toLowerCase())
			),
		[wallpapers, state.filterQuery]
	);

	useEffect(() => {
		setTimeout(() => {
			getWallpapers();
		}, 100);
	}, []);

	return {
		filteredWallpapers,
		setRandomWallpaper,
		setWallpaper,
		wallpapers
	};
};
