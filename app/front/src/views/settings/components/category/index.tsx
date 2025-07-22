import "./styles.css";
import { Reorder, useDragControls } from "motion/react";
import type { Config } from "@/hooks/useConfig";
import type { Categories } from "@/views/settings";
import { ReorderIcon } from "./components/ReorderIcon";

type CategoryProps = {
	type: keyof typeof Categories;
	config: Config;
	setConfig: React.Dispatch<React.SetStateAction<Config | null>>;
};

export const Category = ({ type, config, setConfig }: CategoryProps) => {
	const controls = useDragControls();

	const singularType = type.slice(0, -1);

	return (
		<Reorder.Group
			key={type}
			axis="y"
			className="category"
			values={config?.[type] || []}
			onReorder={(reodered) =>
				setConfig((cfg) => ({
					...cfg!,
					[type]: reodered,
				}))
			}
		>
			<h3 className="category-title"># {type.toUpperCase()}</h3>
			{config?.[type].map((element) => (
				<Reorder.Item
					key={element}
					value={element}
					className="item"
					dragListener={true} // TODO: set false when fixed by motion
					dragControls={controls}
				>
					<input name={singularType} defaultValue={element} />
					<ReorderIcon width={20} dragControls={controls} />
					<button
						type="button"
						className="trash-button"
						onClick={() => {
							setConfig({
								...config,
								[type]: config[type].filter((e) => e !== element),
							});
						}}
					>
						🗑
					</button>
				</Reorder.Item>
			))}

			<li className="add-item">
				<button
					type="button"
					className="add-button"
					onClick={() =>
						setConfig({
							...config!,
							[type]: [...config[type], ""],
						})
					}
				>
					add {singularType}
				</button>
			</li>
		</Reorder.Group>
	);
};
