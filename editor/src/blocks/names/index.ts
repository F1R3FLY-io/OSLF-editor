import * as Blockly from "blockly/core";

// Name constructs from RhoLang grammar
// NameWildcard, NameVar, NameQuote

const definitions = [
	// NameWildcard - wildcard name "_"
	{
		type: "name_wildcard",
		tooltip: "Wildcard name pattern",
		message0: "_",
		output: "Name",
		colour: "65",
	},
	// NameVar - variable name
	{
		type: "name_var",
		tooltip: "Variable name",
		message0: "%1",
		args0: [
			{
				type: "field_input",
				name: "VAR",
				text: "x",
			},
		],
		output: "Name",
		colour: "65",
	},
	// NameQuote - quoted process @Proc
	{
		type: "name_quote",
		tooltip: "Quote process to name: @Proc",
		message0: "@ %1",
		args0: [
			{
				type: "input_value",
				name: "PROC",
				check: "Proc",
			},
		],
		inputsInline: true,
		output: "Name",
		colour: "65",
	},
	// NameDecl - simple name declaration
	{
		type: "name_decl_simple",
		tooltip: "Simple name declaration",
		message0: "%1",
		args0: [
			{
				type: "field_input",
				name: "VAR",
				text: "x",
			},
		],
		output: "NameDecl",
		colour: "65",
	},
	// NameDeclUrn - name declaration with URN
	{
		type: "name_decl_urn",
		tooltip: "Name declaration with URN",
		message0: "%1 ( `%2` )",
		args0: [
			{
				type: "field_input",
				name: "VAR",
				text: "x",
			},
			{
				type: "field_input",
				name: "URN",
				text: "",
			},
		],
		output: "NameDecl",
		colour: "65",
	},
	// NameRemainder - for variadic patterns
	{
		type: "name_remainder",
		tooltip: "Name remainder pattern ...@var",
		message0: "...@ %1",
		args0: [
			{
				type: "field_input",
				name: "VAR",
				text: "rest",
			},
		],
		output: "NameRemainder",
		colour: "65",
	},
];

export default Blockly.common.createBlockDefinitionsFromJsonArray(definitions);
