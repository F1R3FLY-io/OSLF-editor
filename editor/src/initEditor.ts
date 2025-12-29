import { CrossTabCopyPaste } from "@blockly/plugin-cross-tab-copy-paste";
import * as Blockly from "blockly/core";
import * as En from "blockly/msg/en";
import { applyBlockGradients } from "./gradients";
import OslfTheme from "./theme";
// Import to register the custom renderer with triangular connectors
import "./renderer";

export function initEditor(
	container: string | Element,
	initToolbox: Blockly.utils.toolbox.ToolboxDefinition,
): Blockly.WorkspaceSvg {
	Blockly.setLocale(En);

	// Default empty toolbox to allow dynamic updates
	const toolbox = initToolbox;

	let workspace = Blockly.inject(container, {
		trashcan: false,
		sounds: false,
		scrollbars: false,
		disable: false,
		grid: { spacing: 7, length: 1, colour: "#3e4042", snap: true },
		toolbox: toolbox,
		theme: OslfTheme,
		renderer: "oslf_renderer",
	});

	// Init plugins
	const plugin = new CrossTabCopyPaste();
	plugin.init({ contextMenu: true, shortcut: true }, () => {
		console.error("Some error occurred while copying or pasting");
	});
	Blockly.ContextMenuRegistry.registry.unregister("blockDuplicate");

	// Apply gradient styling to blocks
	applyBlockGradients(workspace);

	return workspace;
}
