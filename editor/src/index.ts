import * as Blockly from "blockly/core";
import * as En from "blockly/msg/en";
import { CrossTabCopyPaste } from "@blockly/plugin-cross-tab-copy-paste";
import { OslfTheme } from "./theme";

export enum Events {
	BLOCKLY_LOAD = "blockly:init",
	BLOCKLY_CHANGE = "blockly:change",
}

const DEFAULT_TOOLBOX = {
	kind: "flyoutToolbox",
	contents: [],
};

function initEditor(toolbox?: Blockly.utils.toolbox.ToolboxDefinition) {
	// Default empty toolbox to allow dynamic updates
	const defaultToolbox = toolbox || DEFAULT_TOOLBOX;

	let workspace = Blockly.inject("blockly", {
		trashcan: false,
		sounds: false,
		scrollbars: false,
		disable: false,
		grid: { spacing: 7, length: 1, colour: "#3e4042", snap: true },
		toolbox: defaultToolbox,
		theme: OslfTheme,
	});

	// Init plugins
	const plugin = new CrossTabCopyPaste();
	plugin.init({ contextMenu: true, shortcut: true }, () => {
		console.error("Some error occurred while copying or pasting");
	});
	Blockly.ContextMenuRegistry.registry.unregister("blockDuplicate");

	// Add border styling to toolbox and flyout
	const style = document.createElement("style");
	style.textContent = `
		.blocklyToolbox {
			border-right: 1px solid #2E3F52 !important;
		}
		.blocklyFlyout {
			border-right: 1px solid #2E3F52 !important;
		}
	`;
	document.head.appendChild(style);

	// Hide flyout when clicking on workspace (anywhere except flyout and toolbox)
	const workspaceSvg = workspace as Blockly.WorkspaceSvg;
	const svgElement = workspaceSvg.getCanvas().ownerSVGElement;
	if (svgElement) {
		svgElement.addEventListener("mousedown", (event: MouseEvent) => {
			const target = event.target as HTMLElement;

			// Don't hide if clicking on flyout or toolbox
			if (
				target.closest(".blocklyFlyout") ||
				target.closest(".blocklyToolbox")
			) {
				return;
			}

			// Hide flyout when clicking anywhere on workspace (blocks or background)
			const flyout = workspaceSvg.getFlyout();
			if (flyout && flyout.isVisible()) {
				flyout.setVisible(false);
			}
		});
	}

	return workspace;
}

type ObservedAttributesTypes = "width" | "height";

class EditorElement extends HTMLElement {
	private handlers: Array<Function> = [];
	private workspace: Blockly.Workspace;
	static observedAttributes: ObservedAttributesTypes[] = ["width", "height"];
	private witdh: ObservedAttributesTypes;
	private height: ObservedAttributesTypes;

	attributeChangedCallback(
		name: ObservedAttributesTypes,
		oldValue,
		newValue,
	) {
		this[name] = newValue;
	}

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		Blockly.setLocale(En);
	}

	connectedCallback() {
		this.registerCallbacks();
		this.render();
	}

	removeEventListeners() {
		this.handlers.forEach((callback) => callback());
	}

	disconnectedCallback() {
		this.removeEventListeners();
	}

	dispatchChanges() {
		const state = Blockly.serialization.workspaces.save(
			this.workspace as Blockly.WorkspaceSvg,
		);

		this.dispatchEvent(
			new CustomEvent(Events.BLOCKLY_CHANGE, {
				detail: { state },
				bubbles: true,
				composed: true,
			}),
		);
	}

	registerListener(event: Events, callback: (...args: any[]) => void) {
		this.addEventListener(event, callback);
		this.handlers.push(() => {
			this.removeEventListener(event, callback);
			console.log(`Callback for ${event} removed`);
		});
	}

	loadBlocks(event: CustomEvent) {
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
				kind: "flyoutToolbox",
				contents: customBlocksToolbox,
			};

			// Update the workspace toolbox
			const workspaceSvg = this.workspace as Blockly.WorkspaceSvg;
			workspaceSvg.updateToolbox(updatedToolbox);
		}
	}

	registerCallbacks() {
		this.registerListener(Events.BLOCKLY_LOAD, this.loadBlocks);
	}

	setupWorkspaceChangeListener() {
		let debounceTimer: ReturnType<typeof setTimeout> | null = null;
		this.workspace.addChangeListener((event: Blockly.Events.Abstract) => {
			// Ignore UI events, only save on actual workspace changes
			if (event.isUiEvent) return;

			// Debounce to avoid excessive saves
			if (debounceTimer) {
				clearTimeout(debounceTimer);
			}

			debounceTimer = setTimeout(() => {
				this.dispatchChanges();
			}, 1000); // Save 1 second after last change
		});
	}

	render() {
		if (this.workspace === undefined) {
			console.time("Rendering");
			this.workspace = initEditor();
			this.setupWorkspaceChangeListener();

			console.timeEnd("Rendering");
		}
	}
}

window.customElements.define("oslf-editor", EditorElement);
