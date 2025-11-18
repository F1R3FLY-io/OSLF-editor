import * as Blockly from "blockly/core";
import { defineBlocksWithJsonArray } from "blockly";

const definition = [
	{
		// The type is like the "class name" for your block. It is used to construct
		// new instances. E.g. in the toolbox.
		type: "proc",
		message0: "%1",
		// The message defines the basic text of your block, and where inputs or
		// fields will be inserted.
		args0: [
			{
				type: "field_input",
				name: "value",
				check: "String",
			},
		],
		colour: "9a52FF",
		output: "Proc",
		nextStatement: null,
		previousStatement: null,
	},
];

// Create the definition.
export default Blockly.common.createBlockDefinitionsFromJsonArray(definition);
