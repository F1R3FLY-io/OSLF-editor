import * as Blockly from "blockly/core";

const definition = [
	{
		// The type is like the "class name" for your block. It is used to construct
		// new instances. E.g. in the toolbox.
		type: "for",
		// The message defines the basic text of your block, and where inputs or
		// fields will be inserted.
		message0: "for %1 <- %2 \n %3",
		tooltip: "for: NameIdent x Name x Proc -> Proc",
		// inputsInline: true,
		args0: [
			{
				type: "field_input",
				name: "message",
			},
			{
				type: "input_value",
				name: "channel",
				check: "Name",
			},
			{
				type: "input_statement",
				name: "continuation",
				check: "Proc",
			},
		],
		colour: "208bfe",
		nextStatement: ["Proc"],
		previousStatement: ["Proc"],
	},
];

// Create the definition.
export default Blockly.common.createBlockDefinitionsFromJsonArray(definition);
