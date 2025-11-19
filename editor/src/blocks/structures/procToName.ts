import * as Blockly from "blockly/core";

const definition = [
	{
		// The type is like the "class name" for your block. It is used to construct
		// new instances. E.g. in the toolbox.
		type: "procToName",
		tooltip: "@: Proc -> Name",
		// The message defines the basic text of your block, and where inputs or
		// fields will be inserted.
		inputsInline: true,
		message0: "@ %1",
		args0: [
			{
				type: "input_value",
				name: "message",
				check: "Proc",
			},
		],
		colour: "208bfe",
		output: "Name",
		nextStatement: [],
		prevConnection: null,
	},
];

// Create the definition.
export default Blockly.common.createBlockDefinitionsFromJsonArray(definition);
