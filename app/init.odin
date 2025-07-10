package app

import "../utils"
import "core:fmt"
import os "core:os/os2"

app_name: string
config: utils.Config
config_dir: string
config_file: string
wallpaper_symlink_path: string

init :: proc(name: string, version: string) {
	app_name = name

	home := os.get_env("HOME", context.temp_allocator)
	config_dir = fmt.tprintf("%s/.config/wal", home)
	config_file = fmt.tprintf("%s/config.json", config_dir)
	wallpaper_symlink_path = fmt.tprintf("%s/current", config_dir)

	config = utils.get_config(config_file, config_dir)

	arguments := os.args[1:]

	if (len(arguments) == 0) {
		gui()
	} else {
		cli(arguments, name, version)
	}
	free_all(context.temp_allocator)
}

