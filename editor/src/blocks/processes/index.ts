import * as Blockly from "blockly/core";

// Process constructs from RhoLang grammar
// All Proc-level operations

const definitions = [
	// === Root Block ===
	// Root block that serves as the entry point for all processes
	{
		type: "proc_root",
		tooltip: "Root process - all blocks must connect to this",
		message0: "Root %1",
		args0: [
			{
				type: "input_value",
				name: "BODY",
				check: "Proc",
			},
		],
		colour: "0",
		deletable: false,
	},

	// === Basic Process Types ===

	// PNil - nil process
	{
		type: "proc_nil",
		tooltip: "Nil process",
		message0: "Nil",
		output: "Proc",
		colour: "208bfe",
	},
	// PGround - ground value as process
	{
		type: "proc_ground",
		tooltip: "Ground value as process",
		message0: "%1",
		args0: [
			{
				type: "input_value",
				name: "VALUE",
				check: "Ground",
			},
		],
		inputsInline: true,
		output: "Proc",
		colour: "208bfe",
	},
	// PCollect - collection as process
	{
		type: "proc_collect",
		tooltip: "Collection as process",
		message0: "%1",
		args0: [
			{
				type: "input_value",
				name: "VALUE",
				check: "Collection",
			},
		],
		inputsInline: true,
		output: "Proc",
		colour: "208bfe",
	},
	// PVar - process variable
	{
		type: "proc_var",
		tooltip: "Process variable",
		message0: "%1",
		args0: [
			{
				type: "field_input",
				name: "VAR",
				text: "x",
			},
		],
		output: "Proc",
		colour: "208bfe",
	},
	// ProcVarWildcard - wildcard variable
	{
		type: "proc_var_wildcard",
		tooltip: "Wildcard process variable",
		message0: "_",
		output: "Proc",
		colour: "208bfe",
	},
	// PVarRef - variable reference (=var or =*var)
	{
		type: "proc_var_ref",
		tooltip: "Variable reference: =var",
		message0: "= %1",
		args0: [
			{
				type: "field_input",
				name: "VAR",
				text: "x",
			},
		],
		output: "Proc",
		colour: "208bfe",
	},
	{
		type: "proc_var_ref_name",
		tooltip: "Name variable reference: =*var",
		message0: "=* %1",
		args0: [
			{
				type: "field_input",
				name: "VAR",
				text: "x",
			},
		],
		output: "Proc",
		colour: "208bfe",
	},
	// PSimpleType - simple type as process
	{
		type: "proc_simple_type",
		tooltip: "Simple type as process",
		message0: "%1",
		args0: [
			{
				type: "input_value",
				name: "TYPE",
				check: "SimpleType",
			},
		],
		inputsInline: true,
		output: "Proc",
		colour: "208bfe",
	},
	// PEval - evaluate name to process
	{
		type: "proc_eval",
		tooltip: "Evaluate name: *name",
		message0: "* %1",
		args0: [
			{
				type: "input_value",
				name: "NAME",
				check: "Name",
			},
		],
		inputsInline: true,
		output: "Proc",
		colour: "208bfe",
	},
	// PExprs - parenthesized expression
	{
		type: "proc_paren",
		tooltip: "Parenthesized expression",
		message0: "( %1 )",
		args0: [
			{
				type: "input_value",
				name: "EXPR",
				check: "Proc",
			},
		],
		inputsInline: true,
		output: "Proc",
		colour: "208bfe",
	},

	// === Logical Operations ===

	// PNegation - process negation (~)
	{
		type: "proc_negation",
		tooltip: "Process negation: ~proc",
		message0: "~ %1",
		args0: [
			{
				type: "input_value",
				name: "PROC",
				check: "Proc",
			},
		],
		inputsInline: true,
		output: "Proc",
		colour: "208bfe",
	},
	// PConjunction - process conjunction (/\)
	{
		type: "proc_conjunction",
		tooltip: "Process conjunction: proc /\\ proc",
		message0: "%1 /\\ %2",
		args0: [
			{
				type: "input_value",
				name: "LEFT",
				check: "Proc",
			},
			{
				type: "input_value",
				name: "RIGHT",
				check: "Proc",
			},
		],
		inputsInline: true,
		output: "Proc",
		colour: "208bfe",
	},
	// PDisjunction - process disjunction (\/)
	{
		type: "proc_disjunction",
		tooltip: "Process disjunction: proc \\/ proc",
		message0: "%1 \\/ %2",
		args0: [
			{
				type: "input_value",
				name: "LEFT",
				check: "Proc",
			},
			{
				type: "input_value",
				name: "RIGHT",
				check: "Proc",
			},
		],
		inputsInline: true,
		output: "Proc",
		colour: "208bfe",
	},
	// PNot - logical not
	{
		type: "proc_not",
		tooltip: "Logical not: not proc",
		message0: "not %1",
		args0: [
			{
				type: "input_value",
				name: "PROC",
				check: "Proc",
			},
		],
		inputsInline: true,
		output: "Proc",
		colour: "208bfe",
	},
	// PAnd - logical and
	{
		type: "proc_and",
		tooltip: "Logical and: proc and proc",
		message0: "%1 and %2",
		args0: [
			{
				type: "input_value",
				name: "LEFT",
				check: "Proc",
			},
			{
				type: "input_value",
				name: "RIGHT",
				check: "Proc",
			},
		],
		inputsInline: true,
		output: "Proc",
		colour: "208bfe",
	},
	// POr - logical or
	{
		type: "proc_or",
		tooltip: "Logical or: proc or proc",
		message0: "%1 or %2",
		args0: [
			{
				type: "input_value",
				name: "LEFT",
				check: "Proc",
			},
			{
				type: "input_value",
				name: "RIGHT",
				check: "Proc",
			},
		],
		inputsInline: true,
		output: "Proc",
		colour: "208bfe",
	},

	// === Arithmetic Operations ===

	// PNeg - unary negation
	{
		type: "proc_neg",
		tooltip: "Unary negation: -proc",
		message0: "- %1",
		args0: [
			{
				type: "input_value",
				name: "PROC",
				check: "Proc",
			},
		],
		inputsInline: true,
		output: "Proc",
		colour: "208bfe",
	},
	// PMult - multiplication
	{
		type: "proc_mult",
		tooltip: "Multiplication: proc * proc",
		message0: "%1 * %2",
		args0: [
			{
				type: "input_value",
				name: "LEFT",
				check: "Proc",
			},
			{
				type: "input_value",
				name: "RIGHT",
				check: "Proc",
			},
		],
		inputsInline: true,
		output: "Proc",
		colour: "208bfe",
	},
	// PDiv - division
	{
		type: "proc_div",
		tooltip: "Division: proc / proc",
		message0: "%1 / %2",
		args0: [
			{
				type: "input_value",
				name: "LEFT",
				check: "Proc",
			},
			{
				type: "input_value",
				name: "RIGHT",
				check: "Proc",
			},
		],
		inputsInline: true,
		output: "Proc",
		colour: "208bfe",
	},
	// PMod - modulo
	{
		type: "proc_mod",
		tooltip: "Modulo: proc % proc",
		message0: "%1 %% %2",
		args0: [
			{
				type: "input_value",
				name: "LEFT",
				check: "Proc",
			},
			{
				type: "input_value",
				name: "RIGHT",
				check: "Proc",
			},
		],
		inputsInline: true,
		output: "Proc",
		colour: "208bfe",
	},
	// PPercentPercent - percent percent operator
	{
		type: "proc_percent_percent",
		tooltip: "Percent percent: proc %% proc",
		message0: "%1 %%%% %2",
		args0: [
			{
				type: "input_value",
				name: "LEFT",
				check: "Proc",
			},
			{
				type: "input_value",
				name: "RIGHT",
				check: "Proc",
			},
		],
		inputsInline: true,
		output: "Proc",
		colour: "208bfe",
	},
	// PAdd - addition
	{
		type: "proc_add",
		tooltip: "Addition: proc + proc",
		message0: "%1 + %2",
		args0: [
			{
				type: "input_value",
				name: "LEFT",
				check: "Proc",
			},
			{
				type: "input_value",
				name: "RIGHT",
				check: "Proc",
			},
		],
		inputsInline: true,
		output: "Proc",
		colour: "208bfe",
	},
	// PMinus - subtraction
	{
		type: "proc_minus",
		tooltip: "Subtraction: proc - proc",
		message0: "%1 - %2",
		args0: [
			{
				type: "input_value",
				name: "LEFT",
				check: "Proc",
			},
			{
				type: "input_value",
				name: "RIGHT",
				check: "Proc",
			},
		],
		inputsInline: true,
		output: "Proc",
		colour: "208bfe",
	},
	// PPlusPlus - list concatenation
	{
		type: "proc_plus_plus",
		tooltip: "List concatenation: proc ++ proc",
		message0: "%1 ++ %2",
		args0: [
			{
				type: "input_value",
				name: "LEFT",
				check: "Proc",
			},
			{
				type: "input_value",
				name: "RIGHT",
				check: "Proc",
			},
		],
		inputsInline: true,
		output: "Proc",
		colour: "208bfe",
	},
	// PMinusMinus - set difference
	{
		type: "proc_minus_minus",
		tooltip: "Set difference: proc -- proc",
		message0: "%1 -- %2",
		args0: [
			{
				type: "input_value",
				name: "LEFT",
				check: "Proc",
			},
			{
				type: "input_value",
				name: "RIGHT",
				check: "Proc",
			},
		],
		inputsInline: true,
		output: "Proc",
		colour: "208bfe",
	},

	// === Comparison Operations ===

	// PLt - less than
	{
		type: "proc_lt",
		tooltip: "Less than: proc < proc",
		message0: "%1 < %2",
		args0: [
			{
				type: "input_value",
				name: "LEFT",
				check: "Proc",
			},
			{
				type: "input_value",
				name: "RIGHT",
				check: "Proc",
			},
		],
		inputsInline: true,
		output: "Proc",
		colour: "208bfe",
	},
	// PLte - less than or equal
	{
		type: "proc_lte",
		tooltip: "Less than or equal: proc <= proc",
		message0: "%1 <= %2",
		args0: [
			{
				type: "input_value",
				name: "LEFT",
				check: "Proc",
			},
			{
				type: "input_value",
				name: "RIGHT",
				check: "Proc",
			},
		],
		inputsInline: true,
		output: "Proc",
		colour: "208bfe",
	},
	// PGt - greater than
	{
		type: "proc_gt",
		tooltip: "Greater than: proc > proc",
		message0: "%1 > %2",
		args0: [
			{
				type: "input_value",
				name: "LEFT",
				check: "Proc",
			},
			{
				type: "input_value",
				name: "RIGHT",
				check: "Proc",
			},
		],
		inputsInline: true,
		output: "Proc",
		colour: "208bfe",
	},
	// PGte - greater than or equal
	{
		type: "proc_gte",
		tooltip: "Greater than or equal: proc >= proc",
		message0: "%1 >= %2",
		args0: [
			{
				type: "input_value",
				name: "LEFT",
				check: "Proc",
			},
			{
				type: "input_value",
				name: "RIGHT",
				check: "Proc",
			},
		],
		inputsInline: true,
		output: "Proc",
		colour: "208bfe",
	},
	// PEq - equality
	{
		type: "proc_eq",
		tooltip: "Equality: proc == proc",
		message0: "%1 == %2",
		args0: [
			{
				type: "input_value",
				name: "LEFT",
				check: "Proc",
			},
			{
				type: "input_value",
				name: "RIGHT",
				check: "Proc",
			},
		],
		inputsInline: true,
		output: "Proc",
		colour: "208bfe",
	},
	// PNeq - not equal
	{
		type: "proc_neq",
		tooltip: "Not equal: proc != proc",
		message0: "%1 != %2",
		args0: [
			{
				type: "input_value",
				name: "LEFT",
				check: "Proc",
			},
			{
				type: "input_value",
				name: "RIGHT",
				check: "Proc",
			},
		],
		inputsInline: true,
		output: "Proc",
		colour: "208bfe",
	},
	// PMatches - pattern match
	{
		type: "proc_matches",
		tooltip: "Pattern matches: proc matches proc",
		message0: "%1 matches %2",
		args0: [
			{
				type: "input_value",
				name: "LEFT",
				check: "Proc",
			},
			{
				type: "input_value",
				name: "RIGHT",
				check: "Proc",
			},
		],
		inputsInline: true,
		output: "Proc",
		colour: "208bfe",
	},

	// === Method and Path Operations ===

	// PMethod - method call
	{
		type: "proc_method",
		tooltip: "Method call: proc.method(args)",
		message0: "%1 . %2 ( %3 )",
		args0: [
			{
				type: "input_value",
				name: "OBJECT",
				check: "Proc",
			},
			{
				type: "field_input",
				name: "METHOD",
				text: "method",
			},
			{
				type: "input_value",
				name: "ARGS",
				check: ["Proc", "ProcList"],
			},
		],
		inputsInline: true,
		output: "Proc",
		colour: "208bfe",
	},
	// PPathMap - path map operator
	{
		type: "proc_path_map",
		tooltip: "Path map: %proc",
		message0: "%% %1",
		args0: [
			{
				type: "input_value",
				name: "PROC",
				check: "Proc",
			},
		],
		inputsInline: true,
		output: "Proc",
		colour: "208bfe",
	},

	// === Send Operations ===

	// PSend - single send
	{
		type: "proc_send",
		tooltip: "Send: channel!(args)",
		message0: "%1 ! ( %2 )",
		args0: [
			{
				type: "input_value",
				name: "CHANNEL",
				check: "Name",
			},
			{
				type: "input_value",
				name: "ARGS",
				check: ["Proc", "ProcList"],
			},
		],
		inputsInline: true,
		output: "Proc",
		colour: "208bfe",
	},
	// PSend - multiple send
	{
		type: "proc_send_multiple",
		tooltip: "Persistent send: channel!!(args)",
		message0: "%1 !! ( %2 )",
		args0: [
			{
				type: "input_value",
				name: "CHANNEL",
				check: "Name",
			},
			{
				type: "input_value",
				name: "ARGS",
				check: ["Proc", "ProcList"],
			},
		],
		inputsInline: true,
		output: "Proc",
		colour: "208bfe",
	},
	// PSend - symmetric send
	{
		type: "proc_send_symm",
		tooltip: "Symmetric send: channel!$(args)",
		message0: "%1 !$ ( %2 )",
		args0: [
			{
				type: "input_value",
				name: "CHANNEL",
				check: "Name",
			},
			{
				type: "input_value",
				name: "ARGS",
				check: ["Proc", "ProcList"],
			},
		],
		inputsInline: true,
		output: "Proc",
		colour: "208bfe",
	},
	// PSendSynch - synchronous send
	{
		type: "proc_send_synch",
		tooltip: "Synchronous send: channel!?(args)",
		message0: "%1 !? ( %2 ) %3",
		args0: [
			{
				type: "input_value",
				name: "CHANNEL",
				check: "Name",
			},
			{
				type: "input_value",
				name: "ARGS",
				check: ["Proc", "ProcList"],
			},
			{
				type: "input_value",
				name: "CONT",
				check: "SynchSendCont",
			},
		],
		inputsInline: true,
		output: "Proc",
		colour: "208bfe",
	},
	// SynchSendCont - empty continuation
	{
		type: "synch_send_cont_empty",
		tooltip: "Empty synchronous send continuation",
		message0: ".",
		output: "SynchSendCont",
		colour: "208bfe",
	},
	// SynchSendCont - non-empty continuation
	{
		type: "synch_send_cont",
		tooltip: "Synchronous send continuation: ; proc",
		message0: "; %1",
		args0: [
			{
				type: "input_statement",
				name: "BODY",
				check: "Proc",
			},
		],
		output: "SynchSendCont",
		colour: "208bfe",
	},

	// === Input Operations ===

	// PInput - for loop
	{
		type: "proc_for",
		tooltip: "For: for (receipts) { body }",
		message0: "for ( %1 ) { %2 }",
		args0: [
			{
				type: "input_value",
				name: "RECEIPTS",
				check: "Receipt",
			},
			{
				type: "input_statement",
				name: "BODY",
				check: "Proc",
			},
		],
		output: "Proc",
		colour: "208bfe",
	},
	// PSynchIO - foreach loop
	{
		type: "proc_foreach",
		tooltip: "Foreach: foreach (receipts) { body }",
		message0: "foreach ( %1 ) { %2 }",
		args0: [
			{
				type: "input_value",
				name: "RECEIPTS",
				check: "Receipt",
			},
			{
				type: "input_statement",
				name: "BODY",
				check: "Proc",
			},
		],
		output: "Proc",
		colour: "208bfe",
	},

	// === Parallel Composition ===

	// PPar - parallel composition
	{
		type: "proc_par",
		tooltip: "Parallel composition: proc | proc",
		message0: "%1 | %2",
		args0: [
			{
				type: "input_value",
				name: "LEFT",
				check: "Proc",
			},
			{
				type: "input_value",
				name: "RIGHT",
				check: "Proc",
			},
		],
		inputsInline: true,
		output: "Proc",
		previousConnections: ["Proc"],
		nextConnections: ["Proc"],
		colour: "208bfe",
	},
];

export default Blockly.common.createBlockDefinitionsFromJsonArray(definitions);
