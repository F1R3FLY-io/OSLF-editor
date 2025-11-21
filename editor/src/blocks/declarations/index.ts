import * as Blockly from "blockly/core";

// Declaration constructs from RhoLang grammar
// PNew, PLet, PContr, PBundle

const definitions = [
	// PNew - new name declaration
	{
		type: "proc_new",
		tooltip: "New: new names in body",
		message0: "new %1 in %2",
		args0: [
			{
				type: "input_value",
				name: "NAMES",
				check: ["NameDecl", "NameDeclList"],
			},
			{
				type: "input_statement",
				name: "BODY",
				check: "Proc",
			},
		],
		previousStatement: "Proc",
		nextStatement: "Proc",
		colour: "208bfe",
	},
	// NameDeclList - comma-separated name declarations
	{
		type: "name_decl_list",
		tooltip: "Name declarations: name1, name2, ...",
		message0: "%1 , %2",
		args0: [
			{
				type: "input_value",
				name: "ITEM",
				check: "NameDecl",
			},
			{
				type: "input_value",
				name: "NEXT",
				check: ["NameDeclList", "NameDecl"],
			},
		],
		inputsInline: true,
		output: "NameDeclList",
		colour: "65",
	},
	// PLet - let declaration
	{
		type: "proc_let",
		tooltip: "Let: let decls in body",
		message0: "let %1 in { %2 }",
		args0: [
			{
				type: "input_value",
				name: "DECLS",
				check: "Decl",
			},
			{
				type: "input_statement",
				name: "BODY",
				check: "Proc",
			},
		],
		previousStatement: "Proc",
		nextStatement: "Proc",
		colour: "208bfe",
	},
	// DeclImpl - let declaration binding
	{
		type: "decl",
		tooltip: "Declaration: names <- procs",
		message0: "%1 <- %2",
		args0: [
			{
				type: "input_value",
				name: "NAMES",
				check: ["Name", "NameList"],
			},
			{
				type: "input_value",
				name: "PROCS",
				check: ["Proc", "ProcList"],
			},
		],
		inputsInline: true,
		output: "Decl",
		colour: "208bfe",
	},
	// Linear declarations with ;
	{
		type: "linear_decls",
		tooltip: "Linear declarations: decl1 ; decl2",
		message0: "%1 ; %2",
		args0: [
			{
				type: "input_value",
				name: "LEFT",
				check: "Decl",
			},
			{
				type: "input_value",
				name: "RIGHT",
				check: "Decl",
			},
		],
		inputsInline: true,
		output: "Decl",
		colour: "208bfe",
	},
	// Concurrent declarations with &
	{
		type: "conc_decls",
		tooltip: "Concurrent declarations: decl1 & decl2",
		message0: "%1 & %2",
		args0: [
			{
				type: "input_value",
				name: "LEFT",
				check: "Decl",
			},
			{
				type: "input_value",
				name: "RIGHT",
				check: "Decl",
			},
		],
		inputsInline: true,
		output: "Decl",
		colour: "208bfe",
	},
	// PContr - contract definition
	{
		type: "proc_contract",
		tooltip: "Contract: contract name(params) = { body }",
		message0: "contract %1 ( %2 ) = { %3 }",
		args0: [
			{
				type: "input_value",
				name: "NAME",
				check: "Name",
			},
			{
				type: "input_value",
				name: "PARAMS",
				check: ["Name", "NameList"],
			},
			{
				type: "input_statement",
				name: "BODY",
				check: "Proc",
			},
		],
		previousStatement: "Proc",
		nextStatement: "Proc",
		colour: "1B9461",
	},
	// Contract with remainder
	{
		type: "proc_contract_remainder",
		tooltip:
			"Contract with remainder: contract name(params...rest) = { body }",
		message0: "contract %1 ( %2 ...@ %3 ) = { %4 }",
		args0: [
			{
				type: "input_value",
				name: "NAME",
				check: "Name",
			},
			{
				type: "input_value",
				name: "PARAMS",
				check: ["Name", "NameList"],
			},
			{
				type: "field_input",
				name: "REMAINDER",
				text: "rest",
			},
			{
				type: "input_statement",
				name: "BODY",
				check: "Proc",
			},
		],
		previousStatement: "Proc",
		nextStatement: "Proc",
		colour: "1B9461",
	},
	// PBundle - bundle
	{
		type: "proc_bundle_write",
		tooltip: "Write-only bundle: bundle+ { body }",
		message0: "bundle+ { %1 }",
		args0: [
			{
				type: "input_statement",
				name: "BODY",
				check: "Proc",
			},
		],
		previousStatement: "Proc",
		nextStatement: "Proc",
		colour: "208bfe",
	},
	{
		type: "proc_bundle_read",
		tooltip: "Read-only bundle: bundle- { body }",
		message0: "bundle- { %1 }",
		args0: [
			{
				type: "input_statement",
				name: "BODY",
				check: "Proc",
			},
		],
		previousStatement: "Proc",
		nextStatement: "Proc",
		colour: "208bfe",
	},
	{
		type: "proc_bundle_equiv",
		tooltip: "Equivalence bundle: bundle0 { body }",
		message0: "bundle0 { %1 }",
		args0: [
			{
				type: "input_statement",
				name: "BODY",
				check: "Proc",
			},
		],
		previousStatement: "Proc",
		nextStatement: "Proc",
		colour: "208bfe",
	},
	{
		type: "proc_bundle_rw",
		tooltip: "Read-write bundle: bundle { body }",
		message0: "bundle { %1 }",
		args0: [
			{
				type: "input_statement",
				name: "BODY",
				check: "Proc",
			},
		],
		previousStatement: "Proc",
		nextStatement: "Proc",
		colour: "208bfe",
	},
];

export default Blockly.common.createBlockDefinitionsFromJsonArray(definitions);
