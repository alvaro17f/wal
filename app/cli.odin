package app

import "core:fmt"
import "core:strings"
import "lib:colors"

Config :: struct {
	name:    string,
	version: string,
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
		"%s\n%s %s - wallpapers manager%s\n%s",
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

cli :: proc(arguments: []string, app_name: string, app_version: string) {
	config := Config {
		name    = app_name,
		version = app_version,
	}
	for argument in arguments {
		switch (argument) {
		case "-h", "help":
			help(config.name)
			return
		case "-v", "version":
			version(config.name, config.version)
			return
		case:
			if (!strings.starts_with(argument, "-")) {
				break
			}
		}

		return
	}
}

