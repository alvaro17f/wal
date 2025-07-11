import { render, waitFor } from "@testing-library/react";
import { Settings } from "./index";
import { SettingsProvider } from "@/context/settings";
import { Categories } from "@/context/settings/types";
import { beforeEach, describe, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";

const webuiGetConfigMock = vi
  .fn()
  .mockReturnValue('{\n"commands": [],\n"paths": []\n}');

const webuiSaveConfigMock = vi.fn();

describe("<Settings />", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders the settings dialog", () => {
    const { getByRole } = render(
      <SettingsProvider>
        <Settings />
      </SettingsProvider>,
    );
    expect(
      getByRole("heading", { name: "WAL Settings", hidden: true }),
    ).toBeDefined();
    expect(getByRole("button", { name: "CANCEL", hidden: true })).toBeDefined();
    expect(getByRole("button", { name: "SAVE", hidden: true })).toBeDefined();
  });

  test("displays the categories", () => {
    const { getByText } = render(
      <SettingsProvider>
        <Settings />
      </SettingsProvider>,
    );
    Object.values(Categories).forEach((category) => {
      expect(getByText(category)).toBeDefined();
    });
  });

  test("calls handleCancelButton on cancel button click", async () => {
    global.webui = { ...global.webui, get_config: webuiGetConfigMock };
    const user = userEvent.setup();
    const { getByText } = render(
      <SettingsProvider>
        <Settings />
      </SettingsProvider>,
    );
    const cancelButton = getByText("CANCEL");
    await user.click(cancelButton);
    await waitFor(() => expect(webuiGetConfigMock).toHaveBeenCalled(), {
      timeout: 1000,
    });
  });

  test("calls handleSaveButton on save button click", async () => {
    global.webui = {
      ...global.webui,
      save_config: webuiSaveConfigMock,
    };
    const user = userEvent.setup();
    const { getByText } = render(
      <SettingsProvider>
        <Settings />
      </SettingsProvider>,
    );
    const saveButton = getByText("SAVE");
    await user.click(saveButton);
    expect(webuiSaveConfigMock).toHaveBeenCalled();
  });

  test.skip("should allow user to input a path", async () => {
    const user = userEvent.setup();
    const { getByTestId } = render(
      <SettingsProvider>
        <Settings />
      </SettingsProvider>,
    );

    const input = getByTestId(`${Categories.PATHS}-input`);
    const button = getByTestId(`${Categories.PATHS}-button`);

    await user.click(button);
    await user.type(input, "path/to/image.jpg");

    expect(input).toBe("path/to/image.jpg");
  });
});
