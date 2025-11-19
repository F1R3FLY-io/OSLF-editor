import * as Blockly from "blockly/core";
import * as En from "blockly/msg/en";
import { rholangGenerator } from "./generator";

import { registerAllBlocks, toolboxConfig } from "./blocks";
import createRholangGenerator from "./blocks/generator";

registerAllBlocks();

export enum Events {
	TREE_REQUEST = "tree:request",
	TREE_RETURN = "tree:return",
}

function initEditor() {
	let workspace = Blockly.inject("blockly", {
		trashcan: false,
		sounds: false,
		scrollbars: false,
		grid: { spacing: 20, length: 3, colour: "#ccc", snap: true },
		toolbox: toolboxConfig,
	});

	// Create the root block
	const rootBlock = workspace.newBlock("proc_root");
	rootBlock.initSvg();
	rootBlock.render();
	rootBlock.moveBy(50, 50);

	// Disable any block not connected to the root block.
	workspace.addChangeListener(Blockly.Events.disableOrphans);

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
	}

	render() {
		console.time("Rendering");
		this.handleListeners();

		this.workspace = initEditor();
		console.timeEnd("Rendering");
	}

	attributeChangedCallback(name, oldValue, newValue) {
		this[name] = newValue;
	}
}

window.customElements.define("oslf-editor", EditorElement);
