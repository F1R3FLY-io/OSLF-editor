import * as Blockly from "blockly/core";

// Ground types from RhoLang grammar
// GroundBool, GroundInt, GroundString, GroundUri

const definitions = [
	// BoolTrue - true literal
	{
		type: "ground_bool_true",
		tooltip: "Boolean true literal",
		message0: "true",
		output: "Proc",
		colour: "160",
	},
	// BoolFalse - false literal
	{
		type: "ground_bool_false",
		tooltip: "Boolean false literal",
		message0: "false",
		output: "Proc",
		colour: "160",
	},
	// GroundInt - integer literal
	{
		type: "ground_int",
		tooltip: "Integer literal",
		message0: "%1",
		args0: [
			{
				type: "field_number",
				name: "VALUE",
				value: 0,
				precision: 1,
			},
		],
		output: "Proc",
		colour: "230",
	},
	// GroundString - string literal
	{
		type: "ground_string",
		tooltip: "String literal",
		message0: '"%1"',
		args0: [
			{
				type: "field_input",
				name: "VALUE",
				text: "",
			},
		],
		output: "Proc",
		colour: "160",
	},
	// GroundUri - URI literal
	{
		type: "ground_uri",
		tooltip: "URI literal",
		message0: "`%1`",
		args0: [
			{
				type: "field_input",
				name: "VALUE",
				text: "",
			},
		],
		output: "Proc",
		colour: "290",
	},
	// SimpleTypes
	{
		type: "simple_type_bool",
		tooltip: "Bool type",
		message0: "Bool",
		output: "SimpleType",
		colour: "160",
	},
	{
		type: "simple_type_int",
		tooltip: "Int type",
		message0: "Int",
		output: "SimpleType",
		colour: "230",
	},
	{
		type: "simple_type_string",
		tooltip: "String type",
		message0: "String",
		output: "SimpleType",
		colour: "160",
	},
	{
		type: "simple_type_uri",
		tooltip: "Uri type",
		message0: "Uri",
		output: "SimpleType",
		colour: "290",
	},
	{
		type: "simple_type_byte_array",
		tooltip: "ByteArray type",
		message0: "ByteArray",
		output: "SimpleType",
		colour: "290",
	},
];

export default Blockly.common.createBlockDefinitionsFromJsonArray(definitions);
