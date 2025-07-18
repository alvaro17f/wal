import { Settings } from '@/views/settings';
import { Navbar } from '@/components/navbar';
import { Wallpapers } from '@/components/wallpapers';
import { useWallpapers } from '@/hooks/useWallpapers';
import { Welcome } from '@/components/welcome';

export const App = () => {
	const { allWallpapers } = useWallpapers();

	const shouldShowWelcome = !allWallpapers?.length;

	return (
		<main id="app">
			<Navbar />
			{shouldShowWelcome ? <Welcome /> : <Wallpapers />}
			<Settings />
		</main>
	);
};
