package app

import "base:runtime"
import "core:fmt"
import os "core:os/os2"
import ui "lib:webui"

@(private)
exit_app :: proc "c" (e: ^ui.Event) {
	context = runtime.default_context()
	ui.exit()
}

@(private)
get_wallpapers :: proc "c" (e: ^ui.Event) {
	context = runtime.default_context()

	wallpapers: [dynamic]u8
	defer delete(wallpapers)

	for path in config.paths {
		file, _ := os.read_all_directory_by_path(path, context.temp_allocator)

		for f in file {
			append_string(&wallpapers, fmt.tprintf("%s ", f.name))
		}
	}

	wallpapers_cstr := fmt.ctprintf("%s ", wallpapers)

	ui.return_string(e, wallpapers_cstr)
}


gui :: proc() {
	window := ui.new_window()
	defer ui.clean()
	defer ui.wait()

	ui.set_size(window, 1920, 1080)

	ui.set_config(ui.Config.multi_client, true)

	ui.set_config(ui.Config.use_cookies, false)

	ui.bind(window, "exit_app", exit_app)
	ui.bind(window, "get_wallpapers", get_wallpapers)

	for path in config.paths {
		ui.build_virtual_file_system(path)
	}
	ui.build_virtual_file_system("app/front/dist")

	ui.set_file_handler(window, ui.vfs)

	ui.show_browser(window, "index.html", .AnyBrowser)
}

