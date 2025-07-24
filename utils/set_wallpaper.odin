package utils

import "core:fmt"
import os "core:os/os2"
import "core:strings"
import "lib:colors"

set_wallpaper_symlink :: proc(selected_wallpaper: string, wallpaper_symlink_path: string) {
	if err := os.remove(wallpaper_symlink_path); err != nil {
		fmt.printfln("%s[wallpaper_symlink_destroy]:%s %s", colors.RED, colors.RESET, err)
	}

	if err := os.symlink(selected_wallpaper, wallpaper_symlink_path); err != nil {
		fmt.printfln("%s[wallpaper_symlink]:%s %s", colors.RED, colors.RESET, err)
	}
}

set_wallpaper :: proc(config: ^Config, path_: string) {
	path := path_

	if !os.exists(path) {
		fmt.printfln(
			"%s[configuration_error]%s: check your configuration file",
			colors.RED,
			colors.RESET,
		)
		return
	}

	if strings.contains(path, " ") {
		path, _ = strings.replace_all(path, " ", "\\ ", context.temp_allocator)
	}

	for command in config.commands {
		cmd: string

		if strings.contains(command, "{}") {
			cmd, _ = strings.replace_all(command, "{}", path, context.temp_allocator)
			process_start(cmd, false, false, 0)
		} else {
			cmd = command
			process_start(cmd, false, false)
		}
	}

	fmt.printfln("%s[wallpaper_set]%s: %s", colors.GREEN, colors.RESET, path)
}
