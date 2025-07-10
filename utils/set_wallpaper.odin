package utils

import "core:fmt"
import "core:strings"

set_wallpaper :: proc(config: ^Config, path: string) {
	for command in config.commands {
		cmd: string

		if strings.contains(command, "{}") {
			cmd, _ = strings.replace_all(command, "{}", path, context.temp_allocator)
		}

		if _, err := exec(cmd, false, false, 0); err != nil {
			fmt.printfln("[wallpaper_set]: %s", path)
		}
	}
}

