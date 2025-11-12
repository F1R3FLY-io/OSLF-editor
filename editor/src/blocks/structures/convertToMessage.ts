import * as Blockly from "blockly/core";
import { defineBlocksWithJsonArray } from "blockly";

// Create the definition.
export default Blockly.common.createBlockDefinitionsFromJsonArray([
	{
		// The type is like the "class name" for your block. It is used to construct
		// new instances. E.g. in the toolbox.
		type: "convert_to_message_block",
		// The message defines the basic text of your block, and where inputs or
		// fields will be inserted.
		message0: "@ %1",
		args0: [
			{
				type: "input_value",
				name: "message",
				check: "String",
			},
		],
		// Adds an untyped previous connection to the top of the block.
		previousStatement: null,
		// Adds an untyped next connection to the bottom of the block.
		nextStatement: null,
	},
]);
