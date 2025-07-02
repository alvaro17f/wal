package utils

import "core:encoding/json"
import "core:fmt"
import "core:os"

Config :: struct {
  command: string,
	paths: []string,
}

get_config :: proc(path: string) -> Config {
	config: Config

	data, ok := os.read_entire_file_from_filename(path, context.temp_allocator)

	if ok == false {
		fmt.panicf("Error reading file: %v", path)
	}

	if json_err := json.unmarshal(data, &config, allocator = context.temp_allocator);
	   json_err != nil {
		fmt.panicf("Error unmarshaling json: %v", json_err)
	}

	return config
}

