import * as Blockly from "blockly/core";

const definition = [
	{
		// The type is like the "class name" for your block. It is used to construct
		// new instances. E.g. in the toolbox.
		type: "nameToProc",
		// The message defines the basic text of your block, and where inputs or
		// fields will be inserted.
		inputsInline: true,
		message0: "* %1",
		tooltip: "*: Name -> Proc",
		args0: [
			{
				type: "input_value",
				name: "message",
				check: "Name",
			},
		],
		colour: "208bfe",
		output: "Proc",
		nextStatement: ["Proc"],
		previousStatement: null,
	},
];

// Create the definition.
export default Blockly.common.createBlockDefinitionsFromJsonArray(definition);
