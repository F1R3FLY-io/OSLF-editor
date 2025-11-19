import * as Blockly from "blockly/core";
import { defineBlocksWithJsonArray } from "blockly";

const definition = [
	{
		type: "for_all",
		// The message defines the basic text of your block, and where inputs or
		// fields will be inserted.
		message0: "∀ %1 %2 %3",
		tooltip: "for all",
		args0: [
			{
				type: "input_value",
				name: "left",
				check: "Name",
			},
			{
				type: "input_value",
				name: "right",
				check: "Proc",
			},
			{
				type: "input_value",
				name: "right",
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
