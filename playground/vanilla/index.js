import "@f1r3fly.io/oslf-editor";
import { init } from "@f1r3fly.io/oslf-editor";
import { Events } from "@f1r3fly.io/oslf-editor";

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
	const editor = document.getElementById("blockly");
	const blocksTextarea = document.getElementById("blocks-input");
	const loadButton = document.getElementById("load-blocks-btn");
	const loadExampleButton = document.getElementById("load-example-btn");

	if (!editor) {
		console.error("Editor element not found!");
		return;
	}

	init(editor);

	// Load example blocks from custom_blocks.json
	const loadExampleBlocks = async () => {
		try {
			const response = await fetch("custom_blocks.json");
			if (!response.ok) {
				throw new Error(`Failed to fetch: ${response.status}`);
			}
			const blocks = await response.json();
			editor.dispatchEvent(
				new CustomEvent(Events.INIT, {
					detail: blocks,
				}),
			);
			// Optionally populate textarea with the example
			blocksTextarea.value = JSON.stringify(blocks, null, 2);
		} catch (e) {
			console.error("Failed to load example blocks:", e);
			alert(
				"Failed to load example blocks. Make sure custom_blocks.json exists.",
			);
		}
	};

	// Load custom blocks from textarea
	const loadCustomBlocks = () => {
		const blocksInput = blocksTextarea.value.trim();
		if (!blocksInput) {
			alert("Please paste custom blocks JSON first.");
			return;
		}

		try {
			const blocksJson = JSON.parse(blocksInput);
			editor.dispatchEvent(
				new CustomEvent(Events.INIT, {
					detail: blocksJson,
				}),
			);
		} catch (e) {
			console.error("Invalid blocks JSON:", e);
			alert("Invalid JSON format. Please check your blocks definition.");
		}
	};

	// Get output elements
	const codeOutput = document.getElementById("code-output");
	const stateOutput = document.getElementById("state-output");

	// Listen to workspace changes
	const handleBlocklyChange = (event) => {
		console.log("Workspace changed:", event.detail);

		// Update UI with generated code and workspace state
		const { code, state } = event.detail;

		if (codeOutput) {
			codeOutput.textContent = code || "// No code generated yet. Add blocks to the workspace.";
		}

		if (stateOutput) {
			stateOutput.textContent = state
				? JSON.stringify(state, null, 2)
				: "// No workspace state yet.";
		}
	};

	// Attach event listeners
	loadButton.addEventListener("click", loadCustomBlocks);
	loadExampleButton.addEventListener("click", loadExampleBlocks);
	window.addEventListener(Events.ON_CHANGE, handleBlocklyChange);
});
