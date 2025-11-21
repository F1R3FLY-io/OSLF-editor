import * as Blockly from "blockly/core";

// Control flow constructs from RhoLang grammar
// PIf, PIfElse, PMatch, PChoice (select)

const definitions = [
	// PIf - if statement without else
	{
		type: "proc_if",
		tooltip: "Conditional: if (condition) body",
		message0: "if ( %1 ) %2",
		args0: [
			{
				type: "input_value",
				name: "CONDITION",
				check: "Proc",
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
	// PIfElse - if statement with else
	{
		type: "proc_if_else",
		tooltip: "Conditional: if (condition) then else",
		message0: "if ( %1 ) %2 else %3",
		args0: [
			{
				type: "input_value",
				name: "CONDITION",
				check: "Proc",
			},
			{
				type: "input_statement",
				name: "THEN_BODY",
				check: "Proc",
			},
			{
				type: "input_statement",
				name: "ELSE_BODY",
				check: "Proc",
			},
		],
		previousStatement: "Proc",
		nextStatement: "Proc",
		colour: "208bfe",
	},
	// PMatch - match expression
	{
		type: "proc_match",
		tooltip: "Pattern match: match expr { cases }",
		message0: "match %1 { %2 }",
		args0: [
			{
				type: "input_value",
				name: "EXPR",
				check: "Proc",
			},
			{
				type: "input_statement",
				name: "CASES",
				check: "Case",
			},
		],
		previousStatement: "Proc",
		nextStatement: "Proc",
		colour: "208bfe",
	},
	// CaseImpl - match case
	{
		type: "case",
		tooltip: "Match case: pattern => body",
		message0: "%1 => %2",
		args0: [
			{
				type: "input_value",
				name: "PATTERN",
				check: "Proc",
			},
			{
				type: "input_statement",
				name: "BODY",
				check: "Proc",
			},
		],
		previousStatement: "Case",
		nextStatement: "Case",
		colour: "208bfe",
	},
	// PChoice - select statement
	{
		type: "proc_select",
		tooltip: "Select: select { branches }",
		message0: "select { %1 }",
		args0: [
			{
				type: "input_statement",
				name: "BRANCHES",
				check: "Branch",
			},
		],
		previousStatement: "Proc",
		nextStatement: "Proc",
		colour: "208bfe",
	},
	// BranchImpl - select branch
	{
		type: "branch",
		tooltip: "Select branch: receipt => body",
		message0: "%1 => %2",
		args0: [
			{
				type: "input_value",
				name: "RECEIPT",
				check: "LinearBind",
			},
			{
				type: "input_statement",
				name: "BODY",
				check: "Proc",
			},
		],
		previousStatement: "Branch",
		nextStatement: "Branch",
		colour: "208bfe",
	},
];

export default Blockly.common.createBlockDefinitionsFromJsonArray(definitions);
