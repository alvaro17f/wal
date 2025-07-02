package app

import utils "../utils"
import "base:runtime"
import "core:encoding/json"
import "core:fmt"
import os "core:os/os2"
import "core:strings"
import ui "lib:webui"

@(private)
IMG_EXTENSIONS: [9]string : {
	".jpg",
	".jpeg",
	".png",
	".gif",
	".bmp",
	".tiff",
	".webp",
	".svg",
	".ico",
}

@(private)
exit_app :: proc "c" (e: ^ui.Event) {
	context = runtime.default_context()
	ui.exit()
}

@(private)
get_config :: proc "c" (e: ^ui.Event) {
	context = runtime.default_context()

	cfg, err := json.marshal(config, {pretty = true}, context.temp_allocator)
	if err != nil {
		fmt.panicf("Failed to marshal config: %s", err)
	}

	cfg_cstr := fmt.ctprintf("%s", cfg)

	ui.return_string(e, cfg_cstr)
}


@(private)
get_wallpapers :: proc "c" (e: ^ui.Event) {
	context = runtime.default_context()

	wallpapers: [dynamic]u8
	defer delete(wallpapers)

	for path in config.paths {
		files, error := os.read_all_directory_by_path(path, context.temp_allocator)
		if error != nil {
			fmt.panicf("Failed to read directory %s: %s", path, error)
		}

		for file in files {
			for extension in IMG_EXTENSIONS {
				if strings.ends_with(
					strings.to_lower(file.name, context.temp_allocator),
					extension,
				) {
					append_string(&wallpapers, fmt.tprintf("%s/%s ", path, file.name))
					break
				}
			}

		}
	}

	wallpapers_cstr := fmt.ctprintf("%s ", wallpapers)

	ui.return_string(e, wallpapers_cstr)
}

@(private)
set_wallpaper :: proc "c" (e: ^ui.Event) {
	context = runtime.default_context()

	command: string
	wallpaper_path, err := ui.get_arg(string, e)
	if err != nil {
		fmt.panicf("Failed to get wallpaper_path arg: %s", err)
	}

	if strings.contains(config.command, "{}") {
		command, _ = strings.replace_all(
			config.command,
			"{}",
			wallpaper_path,
			context.temp_allocator,
		)
	}

	utils.exec(command)
}


gui :: proc() {
	window := ui.new_window()
	defer ui.clean()
	defer ui.wait()

	ui.set_size(window, 1920, 1080)

	ui.set_config(ui.Config.multi_client, true)

	ui.set_config(ui.Config.use_cookies, false)

	ui.bind(window, "exit_app", exit_app)
	ui.bind(window, "get_config", get_config)
	ui.bind(window, "get_wallpapers", get_wallpapers)
	ui.bind(window, "set_wallpaper", set_wallpaper)

	for path in config.paths {
		ui.build_virtual_file_system(path)
	}
	ui.build_virtual_file_system("app/front/dist")

	ui.set_file_handler(window, ui.vfs)

	ui.show_browser(window, "index.html", .AnyBrowser)
}

