import "@f1r3fly.io/oslf-editor";
import { init, Events, workspaceSerialization } from "@f1r3fly.io/oslf-editor";

const STORAGE_KEY = "oslf-editor-workspace-state";

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
	const editor = document.getElementById("blockly");
	const blocksTextarea = document.getElementById("blocks-input");
	const loadButton = document.getElementById("load-blocks-btn");
	const loadExampleButton = document.getElementById("load-example-btn");
	const clearStorageButton = document.getElementById("clear-storage-btn");

	if (!editor) {
		console.error("Editor element not found!");
		return;
	}

	const { workspace } = init(editor);

	// Load workspace state from localStorage
	const loadWorkspaceState = () => {
		try {
			const savedState = localStorage.getItem(STORAGE_KEY);
			if (savedState) {
				const state = JSON.parse(savedState);
				workspaceSerialization.load(state, workspace);
				console.log("Workspace state restored from localStorage");
			}
		} catch (e) {
			console.error("Failed to load workspace state:", e);
		}
	};

	// Save workspace state to localStorage
	const saveWorkspaceState = (state) => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
		} catch (e) {
			console.error("Failed to save workspace state:", e);
		}
	};

	// Clear workspace state from localStorage
	const clearWorkspaceState = () => {
		try {
			localStorage.removeItem(STORAGE_KEY);
			workspace.clear();
			console.log("Workspace state cleared");
		} catch (e) {
			console.error("Failed to clear workspace state:", e);
		}
	};

	// Load example blocks from custom_blocks.json
	const loadExampleBlocks = async (restoreState = false) => {
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

			// Restore workspace state after blocks are loaded
			if (restoreState) {
				loadWorkspaceState();
			}
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

		// Auto-save workspace state to localStorage
		if (state) {
			saveWorkspaceState(state);
		}
	};

	// Attach event listeners
	loadButton.addEventListener("click", loadCustomBlocks);
	loadExampleButton.addEventListener("click", () => loadExampleBlocks(false));
	if (clearStorageButton) {
		clearStorageButton.addEventListener("click", clearWorkspaceState);
	}
	window.addEventListener(Events.ON_CHANGE, handleBlocklyChange);

	// Auto-load blocks and restore workspace state on startup
	loadExampleBlocks(true);
});
