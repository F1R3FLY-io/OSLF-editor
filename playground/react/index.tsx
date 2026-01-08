import { createRoot } from "react-dom/client";
import { useRef, useState, useEffect, useCallback } from "react";
import { Events, init, OSLFInstance } from "@f1r3fly.io/oslf-editor";

// Dialog Editor Component
function EditorDialog({
	isOpen,
	onClose,
	onCodeChange,
}: {
	isOpen: boolean;
	onClose: () => void;
	onCodeChange: (code: string, state: object) => void;
}) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const editorContainerRef = useRef<HTMLDivElement>(null);
	const editorInstance = useRef<OSLFInstance | null>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (isOpen) {
			dialog.showModal();
		} else {
			dialog.close();
		}
	}, [isOpen]);

	useEffect(() => {
		if (!isOpen || !editorContainerRef.current) return;

		// Small delay to ensure dialog is fully rendered
		const timer = setTimeout(() => {
			if (editorContainerRef.current && !editorInstance.current) {
				editorInstance.current = init(editorContainerRef.current);

				// Load example blocks
				fetch("custom_blocks.json")
					.then((res) => res.json())
					.then((blocks) => {
						editorContainerRef.current?.dispatchEvent(
							new CustomEvent(Events.INIT, { detail: blocks })
						);
					})
					.catch(console.error);
			}
		}, 100);

		const handleChange = (event: Event) => {
			const { code, state } = (event as CustomEvent).detail;
			onCodeChange(code || "", state || {});
		};

		window.addEventListener(Events.ON_CHANGE, handleChange);

		return () => {
			clearTimeout(timer);
			window.removeEventListener(Events.ON_CHANGE, handleChange);
		};
	}, [isOpen, onCodeChange]);

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === dialogRef.current) {
			onClose();
		}
	};

	return (
		<dialog
			ref={dialogRef}
			className="editor-dialog"
			onClick={handleBackdropClick}
		>
			<div className="dialog-content">
				<div className="dialog-header">
					<h2>OSLF Editor</h2>
					<button
						className="dialog-close-btn"
						onClick={onClose}
						aria-label="Close dialog"
					>
						×
					</button>
				</div>
				<div className="dialog-body">
					<div ref={editorContainerRef} className="dialog-editor" />
				</div>
			</div>
		</dialog>
	);
}

function App() {
	const [blocksInput, setBlocksInput] = useState<string>("");
	const [generatedCode, setGeneratedCode] = useState<string>("");
	const [workspaceState, setWorkspaceState] = useState<string>("");
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [dialogCode, setDialogCode] = useState<string>("");
	const editor = useRef<OSLFInstance>(null);

	const handleBlocklyChange = useCallback((event: Event) => {
		const customEvent = event as CustomEvent;
		console.log("Workspace changed:", customEvent.detail);

		// Update UI with generated code and workspace state
		const { code, state } = customEvent.detail;
		setGeneratedCode(code || "");
		setWorkspaceState(JSON.stringify(state, null, 2));
	}, []);

	const handleDialogCodeChange = useCallback((code: string, state: object) => {
		setDialogCode(code);
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

			{/* Dialog Example Section */}
			<div className="dialog-example-section">
				<div className="control-header">
					<h2>Dialog Example</h2>
					<button
						onClick={() => setIsDialogOpen(true)}
						className="btn btn-primary"
						aria-label="Open editor in dialog"
					>
						Open Editor in Dialog
					</button>
				</div>
				<p className="section-description">
					Click the button to open the OSLF Editor in a modal dialog window.
					This demonstrates how to embed the editor in a popup/modal context.
				</p>
				{dialogCode && (
					<div className="dialog-code-preview">
						<h3>Code from Dialog Editor:</h3>
						<pre className="code-output">{dialogCode}</pre>
					</div>
				)}
			</div>

			<EditorDialog
				isOpen={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
				onCodeChange={handleDialogCodeChange}
			/>

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
				<h2 className="editor-title">Inline Editor</h2>
				<div id="blockly"></div>
			</div>

			<div className="output-section">
				<div className="output-panel">
					<h2>Generated Code</h2>
					<pre className="code-output">{generatedCode || "// No code generated yet. Add blocks to the workspace."}</pre>
				</div>
				<div className="output-panel">
					<h2>Workspace State (JSON)</h2>
					<pre className="state-output">{workspaceState || "// No workspace state yet."}</pre>
				</div>
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
