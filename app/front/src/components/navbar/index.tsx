import './styles.css';
import { useWallpapers } from '@/hooks/useWallpapers';
import { useIcons } from '@/hooks/useIcons';
import { useStateContext } from '@/context/state';

export const Navbar = () => {
	const { setRandomWallpaper } = useWallpapers();
	const { Exit, Random, Settings } = useIcons();
	const { state, setState } = useStateContext();
	return (
		<nav id="nav">
			<input
				type="text"
				className="nav-filter"
				placeholder="Filter by path…"
				value={state.filterQuery}
				onChange={e =>
					setState(s => ({ ...s, filterQuery: e.target.value }))
				}
			/>
			<div className="nav-buttons">
				<button
					className="nav-button"
					onClick={() => {
						webui.exit_app();
					}}
				>
					<img src={Exit} alt="exit" />
				</button>
				<button className="nav-button" onClick={setRandomWallpaper}>
					<img src={Random} alt="random" />
				</button>
				<button
					className="nav-button"
					/*// @ts-expect-error commandfor */
					commandfor="settings"
					command="show-modal"
				>
					<img src={Settings} alt="settings" />
				</button>
			</div>
		</nav>
	);
};
