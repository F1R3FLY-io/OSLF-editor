import * as Blockly from "blockly/core";
import { defineBlocksWithJsonArray } from "blockly";

const definition = [
	{
		// The type is like the "class name" for your block. It is used to construct
		// new instances. E.g. in the toolbox.
		type: "not",
		// The message defines the basic text of your block, and where inputs or
		// fields will be inserted.
		message0: "¬ %1",
		args0: [
			{
				type: "input_value",
				name: "value",
				check: "Proc",
			},
		],
		colour: "9a52FF",
		inputsInline: true,
		output: "Proc",
		nextStatement: null,
		previousStatement: null,
	},
];

// Create the definition.
export default Blockly.common.createBlockDefinitionsFromJsonArray(definition);
