import { useSettings } from "@/context/Settings/Context";
import { useEffect } from "react";
import { ActionKind } from "@/context/Settings/Types";

export const useConfig = () => {
  const { dispatch } = useSettings();

  const getConfig = async () => {
    // @ts-expect-error webui
    const result = await webui.get_config();
    const cfg: Record<string, string[]> = JSON.parse(result);

    for (const [key, value] of Object.entries(cfg)) {
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
