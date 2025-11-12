import * as Blockly from "blockly/core";
import * as libraryBlocks from "blockly/blocks";
import * as En from "blockly/msg/en";
import { rholangGenerator } from "./generator";
import zeroBlock from "./blocks/structures/zero";
import forBlock from "./blocks/structures/for";
import sendBlock from "./blocks/structures/send";
import convertToProcessBlock from "./blocks/structures/convertToProcess";
import convertToMessageBlock from "./blocks/structures/convertToMessage";
import channelNameBlock from "./blocks/structures/channelName";
import trueBlock from "./blocks/collections/true";
import falseBlock from "./blocks/collections/false";
import conjunctionBlock from "./blocks/collections/conjunction";
import disjunctionBlock from "./blocks/collections/disjunction";
import forAllBlock from "./blocks/collections/for_all";
import forSomeBlock from "./blocks/collections/for_some";
import notBlock from "./blocks/collections/not";
import emptyArrayBlock from "./blocks/behavior/empty_pattern_array";
import pattern from "./blocks/behavior/pattern";

export enum Events {
	TREE_REQUEST = "tree:request",
	TREE_RETURN = "tree:return",
}

// Register the definition.
Blockly.common.defineBlocks(zeroBlock);
Blockly.common.defineBlocks(forBlock);
Blockly.common.defineBlocks(sendBlock);
Blockly.common.defineBlocks(convertToMessageBlock);
Blockly.common.defineBlocks(convertToProcessBlock);
Blockly.common.defineBlocks(channelNameBlock);
Blockly.common.defineBlocks(trueBlock);
Blockly.common.defineBlocks(falseBlock);
Blockly.common.defineBlocks(conjunctionBlock);
Blockly.common.defineBlocks(disjunctionBlock);
Blockly.common.defineBlocks(forSomeBlock);
Blockly.common.defineBlocks(forAllBlock);
Blockly.common.defineBlocks(notBlock);
Blockly.common.defineBlocks(emptyArrayBlock);
Blockly.common.defineBlocks(pattern);

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
							type: "zero_block",
						},
						{
							kind: "block",
							type: "for_block",
						},
						{
							kind: "block",
							type: "send_block",
						},
						{
							kind: "block",
							type: "convert_to_process_block",
						},
						{
							kind: "block",
							type: "convert_to_message_block",
						},
						{
							kind: "block",
							type: "channel_block",
						},
					],
				},
				{
					kind: "category",
					name: "Collection",
					contents: [
						{
							kind: "block",
							type: "true_block",
						},
						{
							kind: "block",
							type: "false_block",
						},
						{
							kind: "block",
							type: "conjunction_block",
						},
						{
							kind: "block",
							type: "disjunction_block",
						},
						{
							kind: "block",
							type: "for_all_block",
						},
						{
							kind: "block",
							type: "for_some_block",
						},
						{
							kind: "block",
							type: "not_block",
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
					],
				},
			],
		},
	});

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
