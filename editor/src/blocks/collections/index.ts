import * as Blockly from "blockly/core";

// Collection constructs from RhoLang grammar
// CollectList, CollectTuple, CollectSet, CollectMap

const definitions = [
	// CollectList - list collection [Proc, ...]
	{
		type: "collect_list",
		tooltip: "List collection: [elements...]",
		message0: "[ %1 ]",
		args0: [
			{
				type: "input_value",
				name: "ELEMENTS",
				check: "ProcList",
			},
		],
		inputsInline: true,
		output: "Collection",
		colour: "260",
	},
	// CollectList with remainder
	{
		type: "collect_list_remainder",
		tooltip: "List with remainder: [elements...rest]",
		message0: "[ %1 ...%2 ]",
		args0: [
			{
				type: "input_value",
				name: "ELEMENTS",
				check: "ProcList",
			},
			{
				type: "field_input",
				name: "REMAINDER",
				text: "rest",
			},
		],
		inputsInline: true,
		output: "Collection",
		colour: "260",
	},
	// TupleSingle - single element tuple (x,)
	{
		type: "tuple_single",
		tooltip: "Single element tuple: (element,)",
		message0: "( %1 ,)",
		args0: [
			{
				type: "input_value",
				name: "ELEMENT",
				check: "Proc",
			},
		],
		inputsInline: true,
		output: "Collection",
		colour: "260",
	},
	// TupleMultiple - multiple element tuple
	{
		type: "tuple_multiple",
		tooltip: "Tuple: (element, elements...)",
		message0: "( %1 , %2 )",
		args0: [
			{
				type: "input_value",
				name: "FIRST",
				check: "Proc",
			},
			{
				type: "input_value",
				name: "REST",
				check: "ProcList",
			},
		],
		inputsInline: true,
		output: "Collection",
		colour: "260",
	},
	// CollectSet - set collection Set(...)
	{
		type: "collect_set",
		tooltip: "Set collection: Set(elements...)",
		message0: "Set( %1 )",
		args0: [
			{
				type: "input_value",
				name: "ELEMENTS",
				check: "ProcList",
			},
		],
		inputsInline: true,
		output: "Collection",
		colour: "260",
	},
	// CollectMap - map collection {key: value, ...}
	{
		type: "collect_map",
		tooltip: "Map collection: {key: value, ...}",
		message0: "{ %1 }",
		args0: [
			{
				type: "input_value",
				name: "PAIRS",
				check: "KeyValuePairList",
			},
		],
		inputsInline: true,
		output: "Collection",
		colour: "260",
	},
	// KeyValuePair - single key-value pair
	{
		type: "key_value_pair",
		tooltip: "Key-value pair: key: value",
		message0: "%1 : %2",
		args0: [
			{
				type: "input_value",
				name: "KEY",
				check: "Proc",
			},
			{
				type: "input_value",
				name: "VALUE",
				check: "Proc",
			},
		],
		inputsInline: true,
		output: "KeyValuePair",
		colour: "260",
	},
	// ProcList - list of processes (for args)
	{
		type: "proc_list",
		tooltip: "List of processes",
		message0: "%1 , %2",
		args0: [
			{
				type: "input_value",
				name: "ITEM",
				check: "Proc",
			},
			{
				type: "input_value",
				name: "NEXT",
				check: ["ProcList", "Proc"],
			},
		],
		inputsInline: true,
		output: "ProcList",
		colour: "260",
	},
	// ProcRemainder - process remainder for collections
	{
		type: "proc_remainder",
		tooltip: "Process remainder: ...var",
		message0: "...%1",
		args0: [
			{
				type: "field_input",
				name: "VAR",
				text: "rest",
			},
		],
		output: "ProcRemainder",
		colour: "260",
	},
	// NameList - list of names (for bindings)
	{
		type: "name_list",
		tooltip: "List of names",
		message0: "%1 , %2",
		args0: [
			{
				type: "input_value",
				name: "ITEM",
				check: "Name",
			},
			{
				type: "input_value",
				name: "NEXT",
				check: ["NameList", "Name"],
			},
		],
		inputsInline: true,
		output: "NameList",
		colour: "65",
	},
];

export default Blockly.common.createBlockDefinitionsFromJsonArray(definitions);
