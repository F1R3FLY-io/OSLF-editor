import * as Blockly from "blockly/core";
import * as En from "blockly/msg/en";
import { rholangGenerator } from "./generator";
import emptyArrayBlock from "./blocks/behavior/empty_pattern_array";
import pattern from "./blocks/behavior/pattern";
import {
	zeroBlock,
	forBlock,
	sendBlock,
	nameToProcBlock,
	procToNameBlock,
	nLookupBlock,
} from "./blocks/structures";
import {
	falseBlock,
	trueBlock,
	forSomeBlock,
	forAllBlock,
	procBlock,
	notBlock,
	conjunctionBlock,
	disjunctionBlock,
} from "./blocks/collections";
import contract from "./blocks/behavior/contract";

export enum Events {
	TREE_REQUEST = "tree:request",
	TREE_RETURN = "tree:return",
}

Blockly.common.defineBlocks(contract);

// Register structures
Blockly.common.defineBlocks(zeroBlock);
Blockly.common.defineBlocks(forBlock);
Blockly.common.defineBlocks(sendBlock);
Blockly.common.defineBlocks(nameToProcBlock);
Blockly.common.defineBlocks(procToNameBlock);
Blockly.common.defineBlocks(nLookupBlock);

// Register collections
Blockly.common.defineBlocks(trueBlock);
Blockly.common.defineBlocks(falseBlock);
Blockly.common.defineBlocks(conjunctionBlock);
Blockly.common.defineBlocks(disjunctionBlock);
Blockly.common.defineBlocks(forSomeBlock);
Blockly.common.defineBlocks(forAllBlock);
Blockly.common.defineBlocks(notBlock);
Blockly.common.defineBlocks(emptyArrayBlock);
Blockly.common.defineBlocks(pattern);
Blockly.common.defineBlocks(procBlock);

// This creates an undeletable, unmovable block that that holds all
Blockly.Blocks["factory_base"] = {
	init: function () {
		this.setDeletable(false);
		this.setMovable(false);
		this.setEditable(false);
	},
};

function initEditor() {
	let workspace = Blockly.inject("blockly", {
		trashcan: false,
		sounds: false,
		scrollbars: false,
		grid: { spacing: 20, length: 3, colour: "#ccc", snap: true },
		toolbox: {
			kind: "categoryToolbox",
			contents: [
				{
					kind: "category",
					name: "Structure",
					contents: [
						{
							kind: "block",
							type: "zero",
						},
						{
							kind: "block",
							type: "for",
						},
						{
							kind: "block",
							type: "send",
						},
						{
							kind: "block",
							type: "nameToProc",
						},
						{
							kind: "block",
							type: "procToName",
						},
						{
							kind: "block",
							type: "NLookup",
						},
					],
				},
				{
					kind: "category",
					name: "Collection",
					contents: [
						{
							kind: "block",
							type: "true",
						},
						{
							kind: "block",
							type: "false",
						},
						{
							kind: "block",
							type: "conjunction",
						},
						{
							kind: "block",
							type: "disjunction",
						},
						{
							kind: "block",
							type: "for_all",
						},
						{
							kind: "block",
							type: "for_some",
						},
						{
							kind: "block",
							type: "not",
						},
						{
							kind: "block",
							type: "proc",
						},
					],
				},
				{
					kind: "category",
					name: "Behaviour",
					contents: [
						{
							kind: "block",
							type: "empty_array_block",
						},
						{
							kind: "block",
							type: "pattern_block",
						},
						{
							kind: "block",
							type: "contract_block",
						},
					],
				},
			],
		},
	});

	// Disable any block not connected to the root block.
	workspace.addChangeListener(Blockly.Events.disableOrphans);

	// workspace.addTopBlock({ type: "contract" });

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
			this.dispatchEvent(
				new CustomEvent(Events.TREE_RETURN, {
					detail: rholangGenerator().workspaceToCode(this.workspace),
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
