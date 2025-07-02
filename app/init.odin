package app

import "../utils"
import "core:fmt"
import os "core:os/os2"

config: utils.Config

init :: proc() {
	home := os.get_env("HOME", context.temp_allocator)
	config_path := fmt.tprintf("%s/.config/owa/config.json", home)
	config = utils.get_config(config_path)

	gui()
	free_all(context.temp_allocator)
}

