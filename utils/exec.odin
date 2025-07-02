package utils

import os "core:os/os2"
import "core:strings"

exec :: proc(
	command: string,
	print_stdout: bool = true,
	print_stderr: bool = true,
) -> (
	process_state: os.Process_State,
	error: os.Error,
) {
	process := os.process_start(
		{
			command = strings.split(command, " "),
			stdin = os.stdin,
			stdout = print_stdout ? os.stdout : nil,
			stderr = print_stderr ? os.stderr : nil,
		},
	) or_return

	state := os.process_wait(process) or_return

	os.process_close(process) or_return

	return state, nil
}

