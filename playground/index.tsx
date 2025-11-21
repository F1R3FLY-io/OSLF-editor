import { createRoot } from "react-dom/client";
import { useRef, useState, useEffect } from "react";
import "f1r3fly-io-oslf-editor";

// Render your React component instead
const root = createRoot(document.getElementById("app"));
root.render(<App />);

declare namespace JSX {
	interface IntrinsicElements {
		[elemName: string]: any;
	}
}

const STORAGE_KEY = "oslf-editor-blockly-state";

function App() {
	const ref = useRef<HTMLElement>(null);
	const saveToStorageRef = useRef<boolean>(false);
	const [generatedCode, setGeneratedCode] = useState<string>("");
	const [blocklyState, setBlocklyState] = useState<string>("");
	const [loadInput, setLoadInput] = useState<string>("");
	const [codeCopied, setCodeCopied] = useState<boolean>(false);
	const [stateCopied, setStateCopied] = useState<boolean>(false);

	useEffect(() => {
		const editor = ref.current;
		if (!editor) return;

		const handleTreeReturn = (event: CustomEvent) => {
			setGeneratedCode(event.detail);
		};

		const handleBlocklyReturn = (event: CustomEvent) => {
			const stateJson = JSON.stringify(event.detail, null, 2);
			setBlocklyState(stateJson);

			if (saveToStorageRef.current) {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(event.detail));
				saveToStorageRef.current = false;
			}
		};

		editor.addEventListener("tree:return", handleTreeReturn);
		editor.addEventListener("blockly:return", handleBlocklyReturn);

		// Auto-load from localStorage on start
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved) {
			try {
				const state = JSON.parse(saved);
				editor.dispatchEvent(new CustomEvent("blockly:load", { detail: state }));
			} catch (e) {
				console.log("Failed to load from localStorage. Value:", saved);
				console.error("Parse error:", e);
				localStorage.removeItem(STORAGE_KEY);
			}
		}

		return () => {
			editor.removeEventListener("tree:return", handleTreeReturn);
			editor.removeEventListener("blockly:return", handleBlocklyReturn);
		};
	}, []);

	const handleGenerateCode = () => {
		if (ref.current) {
			ref.current.dispatchEvent(new CustomEvent("tree:request"));
		}
	};

	const handleExportBlockly = () => {
		if (ref.current) {
			ref.current.dispatchEvent(new CustomEvent("blockly:request"));
		}
	};

	const handleLoadBlockly = () => {
		if (ref.current && loadInput) {
			try {
				const state = JSON.parse(loadInput);
				ref.current.dispatchEvent(new CustomEvent("blockly:load", { detail: state }));
			} catch (e) {
				console.error("Invalid JSON", e);
			}
		}
	};

	const handleSaveToStorage = () => {
		if (ref.current) {
			saveToStorageRef.current = true;
			ref.current.dispatchEvent(new CustomEvent("blockly:request"));
		}
	};

	const handleLoadFromStorage = () => {
		if (ref.current) {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) {
				try {
					const state = JSON.parse(saved);
					ref.current.dispatchEvent(new CustomEvent("blockly:load", { detail: state }));
				} catch (e) {
					console.error("Invalid saved state", e);
				}
			}
		}
	};

	const handleCopyCode = async () => {
		try {
			await navigator.clipboard.writeText(generatedCode);
			setCodeCopied(true);
			setTimeout(() => setCodeCopied(false), 2000);
		} catch (e) {
			console.error("Failed to copy code", e);
		}
	};

	const handleCopyState = async () => {
		try {
			await navigator.clipboard.writeText(blocklyState);
			setStateCopied(true);
			setTimeout(() => setStateCopied(false), 2000);
		} catch (e) {
			console.error("Failed to copy state", e);
		}
	};

	return (
		<div>
			<div style={{ marginBottom: "10px" }}>
				<button onClick={handleGenerateCode}>Generate Code</button>
				<button onClick={handleExportBlockly} style={{ marginLeft: "10px" }}>Export Blockly</button>
				<button onClick={handleLoadBlockly} style={{ marginLeft: "10px" }}>Load Blockly</button>
				<button onClick={handleSaveToStorage} style={{ marginLeft: "10px" }}>Save</button>
				<button onClick={handleLoadFromStorage} style={{ marginLeft: "10px" }}>Load</button>
			</div>
			<div style={{ marginBottom: "10px" }}>
				<textarea
					value={loadInput}
					onChange={(e) => setLoadInput(e.target.value)}
					placeholder="Paste Blockly JSON here to load..."
					style={{
						width: "100%",
						height: "100px",
						fontFamily: "monospace",
						fontSize: "12px",
					}}
				/>
			</div>
			<oslf-editor ref={ref}></oslf-editor>
			{generatedCode && (
				<div style={{ marginTop: "10px" }}>
					<div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
						<h3 style={{ margin: 0 }}>Generated Code:</h3>
						<button onClick={handleCopyCode}>
							{codeCopied ? "Copied!" : "Copy"}
						</button>
					</div>
					<pre
						style={{
							backgroundColor: "#f4f4f4",
							padding: "10px",
							borderRadius: "4px",
							overflow: "auto",
							marginTop: "10px",
						}}
					>
						{generatedCode}
					</pre>
				</div>
			)}
			{blocklyState && (
				<div style={{ marginTop: "10px" }}>
					<div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
						<h3 style={{ margin: 0 }}>Blockly State:</h3>
						<button onClick={handleCopyState}>
							{stateCopied ? "Copied!" : "Copy"}
						</button>
					</div>
					<pre
						style={{
							backgroundColor: "#e8f4e8",
							padding: "10px",
							borderRadius: "4px",
							overflow: "auto",
							maxHeight: "300px",
							marginTop: "10px",
						}}
					>
						{blocklyState}
					</pre>
				</div>
			)}
		</div>
	);
}
