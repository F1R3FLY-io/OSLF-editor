import * as Blockly from "blockly/core";
import { defineBlocksWithJsonArray } from "blockly";

const definition = [
	{
		// The type is like the "class name" for your block. It is used to construct
		// new instances. E.g. in the toolbox.
		type: "empty_array_block",
		// The message defines the basic text of your block, and where inputs or
		// fields will be inserted.
		message0: "[]",
		// Adds an untyped next connection to the bottom of the block.
		nextStatement: ["Behavior"],
		previousStatement: ["Behavior"],
		colour: "1B9461",
	},
];

// Create the definition.
export default Blockly.common.createBlockDefinitionsFromJsonArray(definition);
