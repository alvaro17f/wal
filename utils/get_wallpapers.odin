package utils

import "core:fmt"
import os "core:os/os2"
import "core:strings"

IMG_EXTENSIONS: [9]string : {
	".jpg",
	".jpeg",
	".png",
	".gif",
	".bmp",
	".tiff",
	".webp",
	".svg",
	".ico",
}

get_wallpapers :: proc(config: ^Config) -> string {
	wallpapers: [dynamic]u8
	defer delete(wallpapers)

	for path in config.paths {
		files, error := os.read_all_directory_by_path(path, context.temp_allocator)
		if error != nil {
			fmt.panicf("Failed to read directory %s: %s", path, error)
		}

		for file in files {
			for extension in IMG_EXTENSIONS {
				if strings.ends_with(
					strings.to_lower(file.name, context.temp_allocator),
					extension,
				) {
					append_string(&wallpapers, fmt.tprintf("%s/%s ", path, file.name))
					break
				}
			}
		}
	}

	return string(wallpapers[:])
}

