import * as Blockly from "blockly/core";

// Receipt and Bind constructs from RhoLang grammar
// Used in for loops, contracts, etc.

const definitions = [
	// LinearBind - simple linear bind: names <- source
	{
		type: "linear_bind",
		tooltip: "Linear bind: pattern <- channel",
		message0: "%1 <- %2",
		args0: [
			{
				type: "input_value",
				name: "PATTERN",
				check: ["Name", "NameList"],
			},
			{
				type: "input_value",
				name: "SOURCE",
				check: "Name",
			},
		],
		inputsInline: true,
		output: "LinearBind",
		colour: "210",
	},
	// LinearBind with receive-send source: names <- channel?!
	{
		type: "linear_bind_receive_send",
		tooltip: "Linear bind with receive-send: pattern <- channel?!",
		message0: "%1 <- %2 ?!",
		args0: [
			{
				type: "input_value",
				name: "PATTERN",
				check: ["Name", "NameList"],
			},
			{
				type: "input_value",
				name: "SOURCE",
				check: "Name",
			},
		],
		inputsInline: true,
		output: "LinearBind",
		colour: "210",
	},
	// LinearBind with send-receive source: names <- channel!?(args)
	{
		type: "linear_bind_send_receive",
		tooltip: "Linear bind with send-receive: pattern <- channel!?(args)",
		message0: "%1 <- %2 !?( %3 )",
		args0: [
			{
				type: "input_value",
				name: "PATTERN",
				check: ["Name", "NameList"],
			},
			{
				type: "input_value",
				name: "SOURCE",
				check: "Name",
			},
			{
				type: "input_value",
				name: "ARGS",
				check: "ProcList",
			},
		],
		inputsInline: true,
		output: "LinearBind",
		colour: "210",
	},
	// RepeatedBind - repeated bind: names <= source
	{
		type: "repeated_bind",
		tooltip: "Repeated bind: pattern <= channel",
		message0: "%1 <= %2",
		args0: [
			{
				type: "input_value",
				name: "PATTERN",
				check: ["Name", "NameList"],
			},
			{
				type: "input_value",
				name: "SOURCE",
				check: "Name",
			},
		],
		inputsInline: true,
		output: "RepeatedBind",
		colour: "210",
	},
	// PeekBind - peek bind: names <<- source
	{
		type: "peek_bind",
		tooltip: "Peek bind: pattern <<- channel",
		message0: "%1 <<- %2",
		args0: [
			{
				type: "input_value",
				name: "PATTERN",
				check: ["Name", "NameList"],
			},
			{
				type: "input_value",
				name: "SOURCE",
				check: "Name",
			},
		],
		inputsInline: true,
		output: "PeekBind",
		colour: "210",
	},
	// ReceiptLinear - linear receipt wrapper
	{
		type: "receipt_linear",
		tooltip: "Linear receipt",
		message0: "%1",
		args0: [
			{
				type: "input_value",
				name: "BINDS",
				check: "LinearBind",
			},
		],
		inputsInline: true,
		output: "Receipt",
		colour: "210",
	},
	// ReceiptRepeated - repeated receipt wrapper
	{
		type: "receipt_repeated",
		tooltip: "Repeated receipt",
		message0: "%1",
		args0: [
			{
				type: "input_value",
				name: "BINDS",
				check: "RepeatedBind",
			},
		],
		inputsInline: true,
		output: "Receipt",
		colour: "210",
	},
	// ReceiptPeek - peek receipt wrapper
	{
		type: "receipt_peek",
		tooltip: "Peek receipt",
		message0: "%1",
		args0: [
			{
				type: "input_value",
				name: "BINDS",
				check: "PeekBind",
			},
		],
		inputsInline: true,
		output: "Receipt",
		colour: "210",
	},
	// Concurrent binds with &
	{
		type: "concurrent_binds",
		tooltip: "Concurrent binds: bind1 & bind2",
		message0: "%1 & %2",
		args0: [
			{
				type: "input_value",
				name: "LEFT",
				check: ["LinearBind", "RepeatedBind", "PeekBind"],
			},
			{
				type: "input_value",
				name: "RIGHT",
				check: ["LinearBind", "RepeatedBind", "PeekBind"],
			},
		],
		inputsInline: true,
		output: ["LinearBind", "RepeatedBind", "PeekBind"],
		colour: "210",
	},
	// Sequential receipts with ;
	{
		type: "sequential_receipts",
		tooltip: "Sequential receipts: receipt1 ; receipt2",
		message0: "%1 ; %2",
		args0: [
			{
				type: "input_value",
				name: "LEFT",
				check: "Receipt",
			},
			{
				type: "input_value",
				name: "RIGHT",
				check: "Receipt",
			},
		],
		inputsInline: true,
		output: "Receipt",
		colour: "210",
	},
	// Symmetric linear bind: names <-> source
	{
		type: "linear_bind_symm",
		tooltip: "Symmetric linear bind: pattern <-> channel",
		message0: "%1 <-> %2",
		args0: [
			{
				type: "input_value",
				name: "PATTERN",
				check: ["Name", "NameList"],
			},
			{
				type: "input_value",
				name: "SOURCE",
				check: "Name",
			},
		],
		inputsInline: true,
		output: "LinearBindSymm",
		colour: "210",
	},
	// Symmetric repeated bind: names <=> source
	{
		type: "repeated_bind_symm",
		tooltip: "Symmetric repeated bind: pattern <=> channel",
		message0: "%1 <=> %2",
		args0: [
			{
				type: "input_value",
				name: "PATTERN",
				check: ["Name", "NameList"],
			},
			{
				type: "input_value",
				name: "SOURCE",
				check: "Name",
			},
		],
		inputsInline: true,
		output: "RepeatedBindSymm",
		colour: "210",
	},
	// Symmetric peek bind: names <<->> source
	{
		type: "peek_bind_symm",
		tooltip: "Symmetric peek bind: pattern <<->> channel",
		message0: "%1 <<->> %2",
		args0: [
			{
				type: "input_value",
				name: "PATTERN",
				check: ["Name", "NameList"],
			},
			{
				type: "input_value",
				name: "SOURCE",
				check: "Name",
			},
		],
		inputsInline: true,
		output: "PeekBindSymm",
		colour: "210",
	},
];

export default Blockly.common.createBlockDefinitionsFromJsonArray(definitions);
