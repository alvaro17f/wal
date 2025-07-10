package app

import utils "../utils"
import "base:runtime"
import "core:encoding/json"
import "core:fmt"
import os "core:os/os2"
import "lib:colors"
import ui "lib:webui"

@(private = "file")
exit_app :: proc "c" (e: ^ui.Event) {
	context = runtime.default_context()
	ui.exit()
}

@(private = "file")
get_config :: proc "c" (e: ^ui.Event) {
	context = runtime.default_context()

	cfg, err := json.marshal(config, {pretty = true}, context.temp_allocator)
	if err != nil {
		fmt.panicf("Failed to marshal config: %s", err)
	}

	cfg_cstr := fmt.ctprintf("%s", cfg)

	ui.return_string(e, cfg_cstr)
}

@(private = "file")
save_config :: proc "c" (e: ^ui.Event) {
	context = runtime.default_context()

	configuration, err := ui.get_arg(string, e)
	if err != nil {
		fmt.panicf("Failed to get config arg: %s", err)
	}

	json_err := json.unmarshal_string(configuration, &config, allocator = context.temp_allocator)
	if json_err != nil {
		fmt.panicf("Failed to unmarshal config: %s", json_err)
	}

	data, marshal_err := json.marshal(config, {pretty = true}, context.temp_allocator)
	if marshal_err != nil {
		fmt.panicf("Failed to marshal config: %s", marshal_err)
	}

	write_err := os.write_entire_file(config_file, data)
	if write_err != nil {
		fmt.panicf("Failed to write file: %v", write_err)
	}

	utils.exec(app_name, false, false, 0)
	ui.exit()
}

@(private = "file")
get_wallpapers :: proc "c" (e: ^ui.Event) {
	context = runtime.default_context()

	wallpapers := utils.get_wallpapers(&config)

	wallpapers_cstr := fmt.ctprintf("%s ", wallpapers)

	ui.return_string(e, wallpapers_cstr)
}

@(private = "file")
set_wallpaper :: proc "c" (e: ^ui.Event) {
	context = runtime.default_context()

	wallpaper_path, err := ui.get_arg(string, e)
	if err != nil {
		fmt.panicf("Failed to get wallpaper_path arg: %s", err)
	}

	utils.set_wallpaper(&config, wallpaper_path)
	utils.set_wallpaper_symlink(wallpaper_path, wallpaper_symlink_path)
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
	ui.bind(window, "save_config", save_config)
	ui.bind(window, "get_wallpapers", get_wallpapers)
	ui.bind(window, "set_wallpaper", set_wallpaper)

	for path in config.paths {
		if (!os.exists(path)) {
			fmt.printfln(
				"Unable to add %s%s%s to vfs, path does not exist",
				colors.RED,
				path,
				colors.RESET,
			)
			continue
		}
		ui.build_virtual_file_system(path)
	}

	ui.set_file_handler(window, ui.vfsx)

	ui.show_browser(window, "index.html", .AnyBrowser)
}

