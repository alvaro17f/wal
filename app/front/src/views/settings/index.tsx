import './styles.css';
import { useConfig } from '@/hooks/useConfig';
import { Category } from './components/category';

export const Categories = {
	paths: 'paths',
	commands: 'commands'
} as const;

export const Settings = () => {
	const { config, setConfig, handleSubmit, initialConfig } = useConfig();

	return (
		<dialog id="settings">
			<h2 className="title">WAL Settings</h2>
			<form onSubmit={handleSubmit}>
				<button
					type="button"
					className="close-button"
					/*// @ts-expect-error commandfor */
					commandfor="settings"
					command="close"
				>
					X
				</button>
				{Object.values(Categories).map(category => (
					<Category
						key={category}
						type={category}
						config={config!}
						setConfig={setConfig}
					/>
				))}
				<button
					type="button"
					className="cancel-button"
					/*// @ts-expect-error commandfor */
					commandfor="settings"
					command="close"
					onClick={() => setConfig(initialConfig)}
				>
					CANCEL
				</button>
				<button type="submit" className="save-button">
					SAVE
				</button>
			</form>
		</dialog>
	);
};
