import * as Blockly from "blockly/core";
import { defineBlocksWithJsonArray } from "blockly";

const definition = [
	{
		// The type is like the "class name" for your block. It is used to construct
		// new instances. E.g. in the toolbox.
		type: "for",
		// The message defines the basic text of your block, and where inputs or
		// fields will be inserted.
		message0: "for %1 <- %2 %3",
		inputsInline: true,
		args0: [
			{
				type: "input_value",
				name: "message",
				check: "String",
			},
			{
				type: "input_value",
				name: "channel",
				check: "Name",
			},
			{
				type: "input_value",
				name: "process",
				check: "Proc",
			},
		],
		// Adds an untyped previous connection to the top of the block.
		previousStatement: null,
		// Adds an untyped next connection to the bottom of the block.
		nextStatement: null,
		colour: "208bfe",
		output: "Proc",
	},
];

// Create the definition.
export default Blockly.common.createBlockDefinitionsFromJsonArray(definition);
