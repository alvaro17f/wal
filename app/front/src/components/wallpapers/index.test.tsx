import { render, screen } from '@testing-library/react';
import { Wallpapers } from './index';
import { test, describe, vi, beforeEach, type Mock, expect } from 'vitest';
import { useWallpapers } from '@/hooks/useWallpapers';
import userEvent from '@testing-library/user-event';

vi.mock('@/hooks/useWallpapers');

const setWallpaperMock = vi.fn();

describe('<Wallpapers />', () => {
	beforeEach(() => {
		(useWallpapers as Mock).mockReturnValue({
			setWallpaper: setWallpaperMock,
			wallpapers: ['/path/to/wallpaper1.jpg', '/path/to/wallpaper2.jpg']
		});
	});

	test('renders wallpapers correctly', () => {
		render(<Wallpapers />);

		const images = screen.getAllByRole('img');

		expect(images).toHaveLength(2);
	});

	test('calls setWallpaper on image click', async () => {
		const user = userEvent.setup();

		render(<Wallpapers />);

		const images = screen.getAllByRole('img');

		await user.click(images[0]);
		expect(setWallpaperMock).toHaveBeenCalledWith(
			'/path/to/wallpaper1.jpg'
		);

		await user.click(images[1]);
		expect(setWallpaperMock).toHaveBeenCalledWith(
			'/path/to/wallpaper2.jpg'
		);
	});
});
