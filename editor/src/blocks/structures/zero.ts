import * as Blockly from "blockly/core";

const definition = [
	{
		// The type is like the "class name" for your block. It is used to construct
		// new instances. E.g. in the toolbox.
		type: "zero",
		tooltip: "0: 1 -> Proc",
		// The message defines the basic text of your block, and where inputs or
		// fields will be inserted.
		args0: [],
		message0: "0",
		colour: "208bfe",
		output: "Proc",
		nextStatement: ["Proc"],
		previousStatement: null,
	},
];

// Create the definition.
export default Blockly.common.createBlockDefinitionsFromJsonArray(definition);
