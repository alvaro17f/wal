import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { StateProvider } from "@/context/state/provider";
import * as useIcons from "@/hooks/useIcons";
import * as useWallpapers from "@/hooks/useWallpapers";
import { Navbar } from "./index";

const ExitMock = "exit.png";
const RandomMock = "random.png";
const SettingsMock = "settings.png";
const setRandomWallpaperMock = vi.fn();
const setWallpaperMock = vi.fn();
const webuiExitAppMock = vi.fn();

describe("<Navbar />", () => {
	beforeEach(() => {
		vi.spyOn(useWallpapers, "useWallpapers").mockReturnValue({
			setRandomWallpaper: setRandomWallpaperMock,
			setWallpaper: setWallpaperMock,
			allWallpapers: [],
			wallpapers: [],
		});

		vi.spyOn(useIcons, "useIcons").mockReturnValue({
			Exit: ExitMock,
			Random: RandomMock,
			Settings: SettingsMock,
		});
	});

	test("renders navbar with buttons", () => {
		const { getByAltText } = render(
			<StateProvider>
				<Navbar />
			</StateProvider>,
		);

		expect(getByAltText("exit")).toBeDefined();
		expect(getByAltText("random")).toBeDefined();
		expect(getByAltText("settings")).toBeDefined();
	});

	test("clicking the exit button calls webui.exit_app", async () => {
		const user = userEvent.setup();
		global.webui = { ...global.webui, exit_app: webuiExitAppMock };
		const { getByAltText } = render(
			<StateProvider>
				<Navbar />
			</StateProvider>,
		);

		await user.click(getByAltText("exit"));

		expect(webuiExitAppMock).toHaveBeenCalled();
	});

	test("clicking the random button calls setRandomWallpaper", async () => {
		const user = userEvent.setup();
		const { getByAltText } = render(
			<StateProvider>
				<Navbar />
			</StateProvider>,
		);

		await user.click(getByAltText("random"));

		expect(setRandomWallpaperMock).toHaveBeenCalled();
	});
});
