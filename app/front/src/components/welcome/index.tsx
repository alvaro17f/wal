import "./styles.css";
import WAL from "@/assets/logo.png";
import { useIcons } from "@/hooks/useIcons";

export const Welcome = () => {
	const { Settings } = useIcons();

	return (
		<section id="welcome">
			<img className="logo" src={WAL} alt="wal" width={300} height={300} />
			<article className="article">
				<h1 className="title">Welcome to WAL</h1>
				<p>It seems to be your first time here.</p>
				<p>
					To get started, please configure your settings by clicking on the gear
					icon:{" "}
					<button
						type="button"
						className="welcome-button"
						/*// @ts-expect-error commandfor */
						commandfor="settings"
						command="show-modal"
					>
						<img src={Settings} alt="settings" />
					</button>
				</p>
			</article>
		</section>
	);
};
