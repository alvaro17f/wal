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
	fmt.printfln(
		`
%s***************************************************%s
%s%s - wallpapers manager%s
%s***************************************************%s
%s-h, help:%s %sDisplay this help message%s
%s-v, version:%s %sDisplay the current version%s
  `,
		colors.BLUE,
		colors.RESET,
		colors.CYAN,
		strings.to_upper(name, context.temp_allocator),
		colors.RESET,
		colors.BLUE,
		colors.RESET,
		colors.YELLOW,
		colors.RESET,
		colors.GREEN,
		colors.RESET,
		colors.YELLOW,
		colors.RESET,
		colors.GREEN,
		colors.RESET,
	)
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

cli :: proc(arguments: []string, app_version: string) {
	config := Config {
		name    = "owa",
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

