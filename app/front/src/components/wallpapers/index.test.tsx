import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, type Mock, test, vi } from "vitest";
import { StateProvider } from "@/context/state/provider";
import { useWallpapers } from "@/hooks/useWallpapers";
import { Wallpapers } from "./index";

vi.mock("@/hooks/useWallpapers");

const setWallpaperMock = vi.fn();

describe("<Wallpapers />", () => {
	beforeEach(() => {
		(useWallpapers as Mock).mockReturnValue({
			setWallpaper: setWallpaperMock,
			allWallpapers: ["/path/to/wallpaper1.jpg", "/path/to/wallpaper2.jpg"],
			wallpapers: ["/path/to/wallpaper1.jpg", "/path/to/wallpaper2.jpg"],
		});
	});

	test("renders wallpapers correctly", () => {
		render(
			<StateProvider>
				<Wallpapers />
			</StateProvider>,
		);

		const images = screen.getAllByRole("img");

		expect(images).toHaveLength(2);
	});

	test("calls setWallpaper on image click", async () => {
		const user = userEvent.setup();

		render(
			<StateProvider>
				<Wallpapers />
			</StateProvider>,
		);

		const images = screen.getAllByRole("img");

		await user.click(images[0]);
		expect(setWallpaperMock).toHaveBeenCalledWith("/path/to/wallpaper1.jpg");

		await user.click(images[1]);
		expect(setWallpaperMock).toHaveBeenCalledWith("/path/to/wallpaper2.jpg");
	});
});
