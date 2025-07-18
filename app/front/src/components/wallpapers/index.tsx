import './styles.css';
import { useWallpapers } from '@/hooks/useWallpapers';
import { useStateContext } from '@/context/state';

export const Wallpapers = () => {
	const { filteredWallpapers, setWallpaper } = useWallpapers();
	const { state, setState } = useStateContext();

	return (
		<section id="wallpapers">
			{filteredWallpapers.map((wallpaper, idx) => {
				const file = wallpaper.split('/').pop()!;

				return (
					<img
						key={idx}
						className="wallpaper"
						onClick={() => setWallpaper(wallpaper)}
						src={file}
						alt={`wallpaper_${idx}`}
						height={200}
						width={300}
						onMouseEnter={() =>
							setState(s => ({ ...s, tooltipText: wallpaper }))
						}
						onMouseLeave={() =>
							setState(s => ({ ...s, tooltipText: null }))
						}
						title={state.tooltipText ?? ''}
					/>
				);
			})}
		</section>
	);
};
