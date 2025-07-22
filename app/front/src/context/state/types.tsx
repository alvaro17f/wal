export type State = {
	filterQuery: string;
	isLoading: boolean;
	theme: "light" | "dark";
	tooltipText: string | null;
};

export type StateContextValue = {
	state: State;
	setState: React.Dispatch<React.SetStateAction<State>>;
};
