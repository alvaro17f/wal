package app

import "../utils"
import "core:fmt"
import os "core:os/os2"

app_name: string
config: utils.Config
config_dir_path: string
config_file_path: string
wallpaper_symlink_path: string

init :: proc(name: string, version: string) {
	app_name = name

	home := os.get_env("HOME", context.temp_allocator)
	config_dir_path = fmt.tprintf("%s/.config/wal", home)
	config_file_path = fmt.tprintf("%s/config.json", config_dir_path)
	wallpaper_symlink_path = fmt.tprintf("%s/current", config_dir_path)

	config = utils.get_config(config_file_path)

	arguments := os.args[1:]

	if (len(arguments) == 0) {
		gui()
	} else {
		cli(arguments, name, version)
	}
	free_all(context.temp_allocator)
}

