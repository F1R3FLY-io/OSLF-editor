import * as Blockly from "blockly/core";

const definition = [
	{
		// The type is like the "class name" for your block. It is used to construct
		// new instances. E.g. in the toolbox.
		type: "true",
		// The message defines the basic text of your block, and where inputs or
		// fields will be inserted.
		message0: "true",
		args0: [],
		// Adds an untyped next connection to the bottom of the block.
		colour: "9a52FF",
		inputsInline: true,
		output: "Proc",
		nextStatement: null,
		previousStatement: null,
	},
];

// Create the definition.
export default Blockly.common.createBlockDefinitionsFromJsonArray(definition);
