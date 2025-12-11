import * as Blockly from "blockly/core";
import { BlockDefinition } from "blockly/core/blocks";
import { initEditor } from "./initEditor";

export enum Events {
	INIT = "blockly:init",
	ON_CHANGE = "blockly:on_change",
}

const DEFAULT_TOOLBOX = {
	kind: "categoryToolbox",
	contents: [
		{
			kind: "category",
			name: "Conrols",
			contents: [],
		},
	],
};

export type OSLFInstance = {
	workspace: Blockly.Workspace;
	handlers: Array<() => void>;
};

function destroy(instance: OSLFInstance) {
	instance.handlers.forEach((callback) => callback());
	instance.workspace.dispose();
}

function dispatchChanges(workspace: Blockly.Workspace) {
	const state = Blockly.serialization.workspaces.save(
		workspace as Blockly.WorkspaceSvg,
	);

	window.dispatchEvent(
		new CustomEvent(Events.ON_CHANGE, {
			detail: { state },
			bubbles: true,
			composed: true,
		}),
	);
}

function setupWorkspaceChangeListener(workspace: Blockly.Workspace) {
	let debounceTimer: ReturnType<typeof setTimeout> | null = null;

	workspace.addChangeListener((event: Blockly.Events.Abstract) => {
		// Ignore UI events, only save on actual workspace changes
		if (event.isUiEvent) return;

		// Debounce to avoid excessive saves
		if (debounceTimer) {
			clearTimeout(debounceTimer);
		}

		debounceTimer = setTimeout(() => {
			dispatchChanges(workspace);
		}, 1000); // Save 1 second after last change
	});
}

function loadBlocks(
	workspace: Blockly.Workspace,
	event: CustomEvent<BlockDefinition[]>,
) {
	const blocks = event.detail;
	if (blocks) {
		Blockly.defineBlocksWithJsonArray(blocks);

		// Generate toolbox contents from the block definitions
		const customBlocksToolbox = blocks.map((block) => ({
			kind: "block",
			type: block.type,
		}));

		// Create toolbox with blocks in the root (flyout toolbox)
		const updatedToolbox = {
			kind: "categoryToolbox",
			contents: [
				{
					kind: "category",
					name: "Custom blocks",
					contents: customBlocksToolbox,
				},
			],
		};

		// Update the workspace toolbox
		const workspaceSvg = workspace as Blockly.WorkspaceSvg;
		workspaceSvg.updateToolbox(updatedToolbox);
	}
}

export function init(container: Element): OSLFInstance {
	const workspace = initEditor(container, DEFAULT_TOOLBOX);

	container.addEventListener(Events.INIT, (event) => {
		loadBlocks(workspace, event as any);
	});

	setupWorkspaceChangeListener(workspace);

	const handlers = [];

	return {
		workspace,
		handlers,
	};
}
