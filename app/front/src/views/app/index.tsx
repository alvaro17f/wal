import { Navbar } from "@/components/navbar";
import { Wallpapers } from "@/components/wallpapers";
import { Welcome } from "@/components/welcome";
import { useWallpapers } from "@/hooks/useWallpapers";
import { Settings } from "@/views/settings";

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
