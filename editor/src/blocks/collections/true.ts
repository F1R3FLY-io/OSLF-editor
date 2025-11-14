import * as Blockly from "blockly/core";
import { defineBlocksWithJsonArray } from "blockly";

const definition = [
	{
		// The type is like the "class name" for your block. It is used to construct
		// new instances. E.g. in the toolbox.
		type: "true_block",
		// The message defines the basic text of your block, and where inputs or
		// fields will be inserted.
		message0: "true",
		args0: [],
		// Adds an untyped previous connection to the top of the block.
		previousStatement: null,
		// Adds an untyped next connection to the bottom of the block.
		nextStatement: null,
	},
];

// Create the definition.
export default Blockly.common.createBlockDefinitionsFromJsonArray(definition);
