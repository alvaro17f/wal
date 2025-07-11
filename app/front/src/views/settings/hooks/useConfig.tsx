import { useEffect } from "react";
import { useSettings } from "@/context/settings";
import { ActionKind, type Config } from "@/context/settings/types";

const isDevelopment = import.meta.env.MODE === "development";

const mockConfig: Config = {
  commands: [
    "swaybg -i {} -m stretch",
    "gsettings set org.gnome.desktop.background picture-uri {}",
    "gsettings set org.gnome.desktop.background picture-uri-dark {}",
  ],
  paths: [
    "/path/to/wallpaper1",
    "/path/to/wallpaper2/folder",
    "/path/to/wallpaper3/folder/demo",
    "/path/to/wallpaper4/folder/demo/library",
  ],
};

export const useConfig = () => {
  const { dispatch } = useSettings();

  const fetchConfig = async () => {
    const result = await webui.get_config();
    const cfg: Config = JSON.parse(result);
    return cfg;
  };

  const getConfig = async () => {
    const configuration = isDevelopment ? mockConfig : await fetchConfig();

    for (const [key, value] of Object.entries(configuration)) {
      dispatch({
        type: ActionKind.SET_INITIAL_VALUE,
        payload: {
          category: key,
          value: value,
        },
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getConfig();
    }, 100);
  }, []);
};
