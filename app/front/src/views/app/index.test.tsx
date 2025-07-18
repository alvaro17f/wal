import { render } from '@testing-library/react';
import { App } from './index';
import { useWallpapers } from '@/hooks/useWallpapers';
import { describe, expect, test, vi, type Mock } from 'vitest';
import { StateProvider } from '@/context/state/provider';

vi.mock('@/hooks/useWallpapers');

const webuiGetConfigMock = vi
	.fn()
	.mockReturnValue('{\n"commands": [],\n"paths": []\n}');

describe('<App />', () => {
	test('renders the Navbar', () => {
		(useWallpapers as Mock).mockReturnValue({ wallpapers: [] });
		const { getByRole } = render(
			<StateProvider>
				<App />
			</StateProvider>
		);
		expect(getByRole('navigation')).toBeDefined();
	});

	test('renders Welcome component when no wallpapers are present', () => {
		(useWallpapers as Mock).mockReturnValue({ wallpapers: [] });
		const { getByText } = render(
			<StateProvider>
				<App />
			</StateProvider>
		);
		expect(getByText(/welcome/i)).toBeDefined();
	});

	test('renders Wallpapers component when wallpapers are present', () => {
		global.webui = { ...global.webui, get_config: webuiGetConfigMock };
		(useWallpapers as Mock).mockReturnValue({
			allWallpapers: ['wallpaper'],
			wallpapers: ['wallpaper']
		});
		const { getByAltText } = render(
			<StateProvider>
				<App />
			</StateProvider>
		);
		expect(getByAltText(/wallpaper_0/i)).toBeDefined();
	});

	test('renders Settings component', () => {
		(useWallpapers as Mock).mockReturnValue({ wallpapers: [] });
		const { getByText } = render(
			<StateProvider>
				<App />
			</StateProvider>
		);
		expect(getByText(/settings /i)).toBeDefined();
	});
});
