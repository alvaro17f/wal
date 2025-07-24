import type { Config } from "@/hooks/useConfig";
import { Categories } from "@/views/settings";

type UseSettingsProps = {
	type: keyof typeof Categories;
	config: Config;
	setConfig: React.Dispatch<React.SetStateAction<Config | null>>;
};

export const useSettings = ({ type, config, setConfig }: UseSettingsProps) => {
	const handleAddItem = async () => {
		if (type === Categories.paths) {
			const selectedDirectory: string = await webui.select_directory();
			if (!selectedDirectory) return;
			setConfig({
				...config!,
				[type]: [...config[type], selectedDirectory],
			});
		} else {
			setConfig({
				...config!,
				[type]: [...config[type], ""],
			});
		}
	};

	const handleInputReadOnly = type === Categories.paths;

	return { handleAddItem, handleInputReadOnly };
};
