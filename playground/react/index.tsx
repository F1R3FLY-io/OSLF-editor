import { createRoot } from "react-dom/client";
import { useRef, useState, useEffect, useCallback } from "react";
import { Events, init, OSLFInstance } from "@f1r3fly-io/oslf-editor";

function App() {
	const [blocksInput, setBlocksInput] = useState<string>("");
	const editor = useRef<OSLFInstance>(null);

	const handleBlocklyChange = useCallback((event: Event) => {
		const customEvent = event as CustomEvent;
		console.log("Workspace changed:", customEvent.detail);
	}, []);

	useEffect(() => {
		const editorElement = document.getElementById("blockly");
		if (!editorElement) {
			console.error("Editor element not found!");
			return;
		}

		editor.current = init(editorElement);

		window.addEventListener(Events.ON_CHANGE, handleBlocklyChange);

		return () => {
			window.removeEventListener(Events.ON_CHANGE, handleBlocklyChange);
		};
	}, [handleBlocklyChange]);

	const handleLoadCustomBlocks = useCallback(() => {
		if (!blocksInput.trim()) {
			alert("Please paste custom blocks JSON first.");
			return;
		}

		const editorElement = document.getElementById("blockly");
		if (!editorElement) {
			alert("Editor is not ready yet.");
			return;
		}

		try {
			const blocksJson = JSON.parse(blocksInput);
			editorElement.dispatchEvent(
				new CustomEvent(Events.INIT, {
					detail: blocksJson,
				}),
			);
		} catch (e) {
			console.error("Invalid blocks JSON:", e);
			alert("Invalid JSON format. Please check your blocks definition.");
		}
	}, [blocksInput]);

	const handleLoadExampleBlocks = useCallback(async () => {
		const editorElement = document.getElementById("blockly");
		if (!editorElement) {
			alert("Editor is not ready yet.");
			return;
		}

		try {
			const response = await fetch("custom_blocks.json");
			if (!response.ok) {
				throw new Error(`Failed to fetch: ${response.status}`);
			}
			const blocks = await response.json();
			editorElement.dispatchEvent(
				new CustomEvent(Events.INIT, {
					detail: blocks,
				}),
			);
			// Populate textarea with the example
			setBlocksInput(JSON.stringify(blocks, null, 2));
		} catch (e) {
			console.error("Failed to load example blocks:", e);
			alert(
				"Failed to load example blocks. Make sure custom_blocks.json exists.",
			);
		}
	}, []);

	return (
		<div className="container">
			<header>
				<h1>OSLF Editor - React Demo</h1>
				<p>
					A demonstration of embedding the OSLF Editor using React and
					TypeScript.
				</p>
			</header>

			<div className="controls">
				<div className="control-header">
					<h2>Custom Blocks Definitions</h2>
					<div className="button-group">
						<button
							onClick={handleLoadExampleBlocks}
							className="btn btn-secondary"
							aria-label="Load example blocks from custom_blocks.json"
						>
							Load Example Blocks
						</button>
						<button
							onClick={handleLoadCustomBlocks}
							className="btn btn-primary"
							aria-label="Apply custom blocks from textarea"
						>
							Apply Custom Blocks
						</button>
					</div>
				</div>
				<textarea
					id="blocks-input"
					value={blocksInput}
					onChange={(e) => setBlocksInput(e.target.value)}
					placeholder="Paste custom blocks JSON here, or click 'Load Example Blocks' to see an example..."
					rows={10}
				/>
			</div>

			<div className="editor-container">
				<div id="blockly"></div>
			</div>
		</div>
	);
}

// Initialize the React app
const rootElement = document.getElementById("app");
if (!rootElement) {
	throw new Error(
		"Root element not found. Make sure there's a div with id='app' in your HTML.",
	);
}

const root = createRoot(rootElement);
root.render(<App />);
