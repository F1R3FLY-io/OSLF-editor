import { createRoot } from "react-dom/client";
import { useRef, useState, useEffect } from "react";
import "@f1r3fly-io/oslf-editor";
import { Events } from "@f1r3fly-io/oslf-editor";

// Render your React component instead
const root = createRoot(document.getElementById("app"));
root.render(<App />);

declare namespace JSX {
	interface IntrinsicElements {
		[elemName: string]: any;
	}
}

const STORAGE_KEY = "oslf-editor-blockly-state";

const handleBlocklyChange = (event: CustomEvent) => {
	// Auto-save to localStorage whenever workspace changes
	localStorage.setItem(STORAGE_KEY, JSON.stringify(event.detail));
	console.log(event.detail);
};

function App() {
	const ref = useRef<HTMLElement>(null);
	const [blocksInput, setBlocksInput] = useState<string>("");

	useEffect(() => {
		const editor = ref.current;
		if (!editor) return;

		editor.addEventListener(Events.ON_CHANGE, handleBlocklyChange);

		return () => {
			editor.removeEventListener(
				Events.ON_CHANGE,
				handleBlocklyChange,
			);
		};
	}, []);

	const handleLoadCustomBlocks = () => {
		if (ref.current && blocksInput) {
			try {
				const blocksJson = JSON.parse(blocksInput);
				ref.current.dispatchEvent(
					new CustomEvent(Events.INIT, {
						detail: blocksJson,
					}),
				);
			} catch (e) {
				console.error("Invalid blocks JSON", e);
				alert(
					"Invalid JSON format. Please check your blocks definition.",
				);
			}
		}
	};

	return (
		<>
			<div
				style={{
					marginBottom: "10px",
					borderTop: "2px solid #ccc",
					paddingTop: "10px",
				}}
			>
				<div style={{ marginBottom: "5px" }}>
					<strong>Custom Blocks Definitions:</strong>
					<button
						onClick={handleLoadCustomBlocks}
						style={{ marginLeft: "10px" }}
					>
						Apply Custom Blocks
					</button>
				</div>
				<textarea
					value={blocksInput}
					onChange={(e) => setBlocksInput(e.target.value)}
					placeholder="Paste custom blocks JSON here..."
					style={{
						width: "100%",
						height: "150px",
						fontFamily: "monospace",
						fontSize: "12px",
					}}
				/>
			</div>
			<oslf-editor ref={ref}></oslf-editor>
		</>
	);
}
