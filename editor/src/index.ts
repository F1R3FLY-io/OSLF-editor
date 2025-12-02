import * as Blockly from "blockly/core";
import * as En from "blockly/msg/en";
import { rholangGenerator } from "./generator";

import { registerAllBlocks, toolboxConfig } from "./blocks";
import createRholangGenerator from "./blocks/generator";
import { OslfTheme } from "./theme";

registerAllBlocks();

export enum Events {
	TREE_REQUEST = "tree:request",
	TREE_RETURN = "tree:return",
	BLOCKLY_REQUEST = "blockly:request",
	BLOCKLY_RETURN = "blockly:return",
	BLOCKLY_LOAD = "blockly:load",
	BLOCKLY_CHANGE = "blockly:change",
}

function initEditor() {
	let workspace = Blockly.inject("blockly", {
		trashcan: false,
		sounds: false,
		scrollbars: false,
		grid: { spacing: 7, length: 1, colour: "#3e4042", snap: true },
		toolbox: toolboxConfig,
		theme: OslfTheme,
	});

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

	// Create the root block
	const rootBlock = workspace.newBlock("proc_root");
	rootBlock.initSvg();
	rootBlock.render();
	rootBlock.moveBy(50, 50);

	// Disable any block not connected to the root block.
	workspace.addChangeListener(Blockly.Events.disableOrphans);

	// Show toolbox when a block is selected
	workspace.addChangeListener((event: Blockly.Events.Abstract) => {
		if (event.type === Blockly.Events.SELECTED) {
			// Make toolbox visible
			const toolboxDiv = document.querySelector(".blocklyToolboxDiv");
			if (toolboxDiv) {
				(toolboxDiv as HTMLElement).style.display = "block";
			}

			// Show flyout if available
			const workspaceSvg = workspace as Blockly.WorkspaceSvg;
			if (workspaceSvg.getFlyout && workspaceSvg.getFlyout()) {
				const flyout = workspaceSvg.getFlyout();
				if (flyout) {
					(flyout as any).setVisible(true);
				}
			}
		}
	});

	// Hide flyout when clicking on workspace pane
	const workspaceSvg = workspace as Blockly.WorkspaceSvg;
	const svgElement = workspaceSvg.getCanvas().ownerSVGElement;
	if (svgElement) {
		svgElement.addEventListener("click", (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			// Check if clicked on workspace background (not a block)
			if (
				target.classList.contains("blocklyMainBackground") ||
				target.classList.contains("blocklyWorkspace") ||
				target.tagName === "svg"
			) {
				const flyout = workspaceSvg.getFlyout();
				if (flyout) {
					flyout.setVisible(false);
				}
			}
		});
	}

	return workspace;
}

class EditorElement extends HTMLElement {
	handlers: Array<Function> = [];
	private workspace: Blockly.Workspace;

	static observedAttributes = ["width", "height"];

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		Blockly.setLocale(En);
	}

	connectedCallback() {
		this.render();
	}

	handleListeners() {
		this.handlers.forEach((callback) => callback());

		const listenTreeRequest = () => {
			const generator = createRholangGenerator();
			const code = generator.workspaceToCode(this.workspace);
			console.log(code);

			this.dispatchEvent(
				new CustomEvent(Events.TREE_RETURN, {
					detail: code,
					bubbles: true,
					composed: true,
				}),
			);
		};

		this.addEventListener(Events.TREE_REQUEST, listenTreeRequest);
		this.handlers.push(() => {
			this.removeEventListener(Events.TREE_REQUEST, listenTreeRequest);
			console.log("Callback removed");
		});

		const listenBlocklyRequest = () => {
			const state = Blockly.serialization.workspaces.save(
				this.workspace as Blockly.WorkspaceSvg,
			);
			console.log(state);

			this.dispatchEvent(
				new CustomEvent(Events.BLOCKLY_RETURN, {
					detail: state,
					bubbles: true,
					composed: true,
				}),
			);
		};

		this.addEventListener(Events.BLOCKLY_REQUEST, listenBlocklyRequest);
		this.handlers.push(() => {
			this.removeEventListener(
				Events.BLOCKLY_REQUEST,
				listenBlocklyRequest,
			);
			console.log("Blockly callback removed");
		});

		const listenBlocklyLoad = (event: CustomEvent) => {
			const state = event.detail;
			if (state) {
				Blockly.serialization.workspaces.load(
					state,
					this.workspace as Blockly.WorkspaceSvg,
				);
				console.log("Blockly state loaded");
			}
		};

		this.addEventListener(Events.BLOCKLY_LOAD, listenBlocklyLoad);
		this.handlers.push(() => {
			this.removeEventListener(Events.BLOCKLY_LOAD, listenBlocklyLoad);
			console.log("Blockly load callback removed");
		});
	}

	render() {
		console.time("Rendering");
		this.handleListeners();

		this.workspace = initEditor();

		// Auto-save workspace changes with debouncing
		let debounceTimer: ReturnType<typeof setTimeout> | null = null;
		this.workspace.addChangeListener((event: Blockly.Events.Abstract) => {
			// Ignore UI events, only save on actual workspace changes
			if (event.isUiEvent) return;

			// Debounce to avoid excessive saves
			if (debounceTimer) {
				clearTimeout(debounceTimer);
			}

			debounceTimer = setTimeout(() => {
				const state = Blockly.serialization.workspaces.save(
					this.workspace as Blockly.WorkspaceSvg,
				);
				this.dispatchEvent(
					new CustomEvent(Events.BLOCKLY_CHANGE, {
						detail: state,
						bubbles: true,
						composed: true,
					}),
				);
			}, 1000); // Save 1 second after last change
		});

		console.timeEnd("Rendering");
	}

	attributeChangedCallback(name, oldValue, newValue) {
		this[name] = newValue;
	}
}

window.customElements.define("oslf-editor", EditorElement);
