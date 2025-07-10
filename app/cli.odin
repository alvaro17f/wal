package app

import "../utils"
import "core:fmt"
import "core:math/rand"
import "core:strings"
import "lib:colors"

Settings :: struct {
	name:    string,
	version: string,
	path:    string,
}

@(private)
help :: proc(name: string) {
	bar :: proc(color: string) -> string {
		return fmt.tprintf(
			"%s***************************************************%s",
			color,
			colors.RESET,
		)
	}

	cmd :: proc(command: string, description: string) {
		fmt.printfln(
			"%s%s:%s %s%s%s",
			colors.YELLOW,
			command,
			colors.RESET,
			colors.GREEN,
			description,
			colors.RESET,
		)
	}

	fmt.printfln(
		"\n%s\n%s %s - wallpapers manager%s\n%s",
		bar(colors.BLUE),
		colors.CYAN,
		strings.to_upper(name, context.temp_allocator),
		colors.RESET,
		bar(colors.BLUE),
	)
	cmd("-h, help", "Display this help message")
	cmd("-v, version", "Display the current version")
	cmd("-s, set", "Set a wallpaper with the given path")
	cmd("-r, random", "Set a random wallpaper")
}


@(private)
version :: proc(name: string, version: string) {
	fmt.printfln(
		"\n%s%s Version:%s %s%s%s",
		colors.YELLOW,
		strings.to_upper(name, context.temp_allocator),
		colors.RESET,
		colors.CYAN,
		version,
		colors.RESET,
	)
}

@(private = "file")
set_wallpaper :: proc(path: string) {
	utils.set_wallpaper(&config, path)
	utils.set_wallpaper_symlink(path, wallpaper_symlink_path)
}

@(private = "file")
set_random_wallpaper :: proc() {
	wallpapers_str := utils.get_wallpapers(&config)
	wallpapers, err := strings.split(wallpapers_str, " ", context.temp_allocator)
	if err != nil {
		fmt.panicf("Failed to split wallpapers string: %s", err)
	}

	random_wallpaper := rand.choice(wallpapers)

	utils.set_wallpaper(&config, random_wallpaper)
	utils.set_wallpaper_symlink(random_wallpaper, wallpaper_symlink_path)
}


cli :: proc(arguments: []string, app_name: string, app_version: string) {
	settings := Settings {
		name    = app_name,
		version = app_version,
	}

	for argument, idx in arguments {
		switch (argument) {
		case "-h", "help":
			help(settings.name)
			return
		case "-v", "version":
			version(settings.name, settings.version)
			return
		case "-r", "random":
			set_random_wallpaper()
			return
		case "-s", "set":
			set_wallpaper(arguments[idx + 1])
			return
		case:
			if (!strings.starts_with(argument, "-")) {
				break
			}
		}

		return
	}
}

