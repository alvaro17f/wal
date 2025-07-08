package utils

import "core:strings"

set_wallpaper :: proc(config: ^Config, path: string) {
	for command in config.commands {
		cmd: string

		if strings.contains(command, "{}") {
			cmd, _ = strings.replace_all(command, "{}", path, context.temp_allocator)
		}

		exec(cmd, false, false, 0)
	}
}

