package app

import "../utils"
import "core:fmt"
import os "core:os/os2"

config: utils.Config
config_path: string
app_name: string

init :: proc(name: string, version: string) {
	app_name = name

	home := os.get_env("HOME", context.temp_allocator)
	config_path = fmt.tprintf("%s/.config/wal/config.json", home)

	config = utils.get_config(config_path)

	arguments := os.args[1:]

	if (len(arguments) == 0) {
		gui()
	} else {
		cli(arguments, name, version)
	}
	free_all(context.temp_allocator)
}

