package webui

import "base:runtime"
import "core:fmt"
import "core:os"
import "core:strings"

//////////////////////////////////////////////////////////////////////////////
directories := [][]runtime.Load_Directory_File {
	#load_directory("../../app/front/dist"),
	#load_directory("../../app/front/dist/assets"),
}

vfsx :: proc "c" (path: cstring, length: ^i32) -> rawptr {
	context = runtime.default_context()

	file_data: []byte

	for directory in directories {
		for file in directory {
			if strings.contains(fmt.tprint(path), file.name) {
				content_type: string = string(get_mime_type(strings.clone_to_cstring(file.name)))

				http_header_template: string = fmt.aprintf(
					"HTTP/1.1 200 OK\r\nContent-Type: %s\r\nContent-Length: %d\r\nCache-Control: no-cache\r\n\r\n",
					content_type,
					len(file.data),
				)
				header_length: i32 = i32(len(http_header_template))

				length^ = header_length + i32(len(file.data))

				file_data_str: string = strings.clone_from_bytes(file.data)

				response: rawptr = rawptr(
					raw_data(
						transmute([]u8)strings.concatenate({http_header_template, file_data_str}),
					),
				)

				return response
			}
		}
	}

	if virtual_file_system(path, &file_data) {
		content_type: string = string(get_mime_type(path))

		http_header_template: string = fmt.aprintf(
			"HTTP/1.1 200 OK\r\nContent-Type: %s\r\nContent-Length: %d\r\nCache-Control: no-cache\r\n\r\n",
			content_type,
			len(file_data),
		)
		header_length: i32 = i32(len(http_header_template))

		length^ = header_length + i32(len(file_data))

		file_data_str: string = strings.clone_from_bytes(file_data, context.temp_allocator)

		response: rawptr = rawptr(
			raw_data(
				transmute([]u8)strings.concatenate(
					{http_header_template, file_data_str},
					context.temp_allocator,
				),
			),
		)

		return response
	}

	return nil
}
//////////////////////////////////////////////////////////////////////////////

virtual_files := make(map[string][]byte)
index_paths := make([dynamic]string)

build_virtual_file_system :: proc(root_dir: string) {
	dir_stack: [dynamic]string
  defer delete(dir_stack)
	append(&dir_stack, root_dir)

	for len(dir_stack) > 0 {
		current_dir: string = pop(&dir_stack)

		file_handle, err := os.open(current_dir)
		if err != os.ERROR_NONE {
			fmt.eprintln("Could not open directory for reading", err)
			os.exit(1)
		}
		defer (os.close(file_handle))

		entries, dir_err := os.read_dir(file_handle, -1)
		if dir_err != nil {
			fmt.eprintfln("os.read_dir(file_handle, -1) for getting entries failed")
		}
		defer (delete(entries))

		for entry in entries {
			if entry.name == "." || entry.name == ".." {
				break
			}

			fullpath: string = strings.concatenate(
				{current_dir, "/", entry.name},
				context.temp_allocator,
			)

			if !entry.is_dir {
				data, pass := os.read_entire_file_from_filename(fullpath, context.temp_allocator)
				if !pass {
					fmt.eprintfln("File did not open: %s", fullpath)
					break
				}

				proper_path, _ := strings.remove_all(fullpath, root_dir, context.temp_allocator)
				virtual_files[proper_path] = data

				if strings.contains(entry.name, "index.") {
					append(&index_paths, proper_path)
				}
			} else {
				append(&dir_stack, fullpath)
				append(
					&index_paths,
					strings.concatenate({"/", entry.name, "/"}, context.temp_allocator),
				)
			}
		}
	}
}


virtual_file_system :: proc(path: cstring, file_data: ^[]byte) -> bool {
	data, ok := virtual_files[string(path)]
	if ok {
		file_data^ = data
		return true
	} else {
		fmt.eprintfln("[%s] was not found in vfs map", path)
	}
	return false
}

vfs :: proc "c" (path: cstring, length: ^i32) -> rawptr {
	context = runtime.default_context()

	file_data: []byte

	if virtual_file_system(path, &file_data) {
		content_type: string = string(get_mime_type(path))

		http_header_template: string = fmt.aprintf(
			"HTTP/1.1 200 OK\r\nContent-Type: %s\r\nContent-Length: %d\r\nCache-Control: no-cache\r\n\r\n",
			content_type,
			len(file_data),
		)
		header_length: i32 = i32(len(http_header_template))

		length^ = header_length + i32(len(file_data))

		file_data_str: string = strings.clone_from_bytes(file_data, context.temp_allocator)

		response: rawptr = rawptr(
			raw_data(
				transmute([]u8)strings.concatenate(
					{http_header_template, file_data_str},
					context.temp_allocator,
				),
			),
		)

		return response
	} else {
		redirect_path: string = string(path)
		redirect_length: uint = len(redirect_path)

		if redirect_path[redirect_length - 1] != '/' {
			redirect_path = strings.concatenate({redirect_path, "/"}, context.temp_allocator)
		}

		for idx_file, idx in index_paths {
			if strings.compare(idx_file, redirect_path) == 0 {
				location_header: string = fmt.aprintf(
					"HTTP/1.1 302 Found\r\nLocation: %s\r\nCache-Control: no-cache\r\n\r\n",
					index_paths[idx + 1],
				)
				length^ = i32(len(location_header))
				response: rawptr = rawptr(raw_data(transmute([]u8)location_header))
				return response
			}
		}
	}
	return nil
}

