import * as Blockly from "blockly/core";
import { defineBlocksWithJsonArray } from "blockly";

const definition = [
	{
		// The type is like the "class name" for your block. It is used to construct
		// new instances. E.g. in the toolbox.
		type: "pattern_block",
		// The message defines the basic text of your block, and where inputs or
		// fields will be inserted.
		message0: "<...> \n %1 \n %2",
		args0: [
			{
				type: "input_value",
				name: "INPUT1",
				check: "Name",
			},
			{
				type: "input_statement",
				name: "INPUT2",
				check: "Proc",
			},
		],
		nextStatement: ["Behavior"],
		previousStatement: ["Behavior"],
		colour: "1B9461",
		inputsInline: true,
	},
];

// Create the definition.
export default Blockly.common.createBlockDefinitionsFromJsonArray(definition);
