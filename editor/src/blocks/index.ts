import * as Blockly from "blockly/core";

// Import all block definitions
import groundBlocks from "./ground";
import nameBlocks from "./names";
import collectionBlocks from "./collections";
import receiptBlocks from "./receipts";
import controlBlocks from "./control";
import declarationBlocks from "./declarations";
import processBlocks from "./processes";

// Export individual block modules
export { default as groundBlocks } from "./ground";
export { default as nameBlocks } from "./names";
export { default as collectionBlocks } from "./collections";
export { default as receiptBlocks } from "./receipts";
export { default as controlBlocks } from "./control";
export { default as declarationBlocks } from "./declarations";
export { default as processBlocks } from "./processes";

// All blocks combined for easy registration
export const allBlocks = {
	ground: groundBlocks,
	names: nameBlocks,
	collections: collectionBlocks,
	receipts: receiptBlocks,
	control: controlBlocks,
	declarations: declarationBlocks,
	processes: processBlocks,
};

// Register all blocks with Blockly
export function registerAllBlocks(): void {
	Blockly.common.defineBlocks(groundBlocks);
	Blockly.common.defineBlocks(nameBlocks);
	Blockly.common.defineBlocks(collectionBlocks);
	Blockly.common.defineBlocks(receiptBlocks);
	Blockly.common.defineBlocks(controlBlocks);
	Blockly.common.defineBlocks(declarationBlocks);
	Blockly.common.defineBlocks(processBlocks);
}

// Toolbox configuration for all RhoLang blocks
export const toolboxConfig = {
	kind: "categoryToolbox",
	contents: [
		{
			kind: "category",
			name: "Ground Types",
			contents: [
				{ kind: "block", type: "ground_bool_true" },
				{ kind: "block", type: "ground_bool_false" },
				{ kind: "block", type: "ground_int" },
				{ kind: "block", type: "ground_string" },
				{ kind: "block", type: "ground_uri" },
				{ kind: "block", type: "simple_type_bool" },
				{ kind: "block", type: "simple_type_int" },
				{ kind: "block", type: "simple_type_string" },
				{ kind: "block", type: "simple_type_uri" },
				{ kind: "block", type: "simple_type_byte_array" },
			],
		},
		{
			kind: "category",
			name: "Names",
			contents: [
				{ kind: "block", type: "name_wildcard" },
				{ kind: "block", type: "name_var" },
				{
					kind: "block",
					type: "name_quote",
					inputs: {
						PROC: { shadow: { type: "proc_var" } },
					},
				},
				{ kind: "block", type: "name_decl_simple" },
				{ kind: "block", type: "name_decl_urn" },
				{ kind: "block", type: "name_remainder" },
				{
					kind: "block",
					type: "name_list",
					inputs: {
						ITEM: { shadow: { type: "name_var" } },
						NEXT: { shadow: { type: "name_var" } },
					},
				},
			],
		},
		{
			kind: "category",
			name: "Collections",
			contents: [
				{
					kind: "block",
					type: "collect_list",
					inputs: {
						ELEMENTS: {
							shadow: {
								type: "proc_list",
								inputs: {
									ITEM: { shadow: { type: "proc_var" } },
									NEXT: { shadow: { type: "proc_var" } },
								},
							},
						},
					},
				},
				{
					kind: "block",
					type: "collect_list_remainder",
					inputs: {
						ELEMENTS: {
							shadow: {
								type: "proc_list",
								inputs: {
									ITEM: { shadow: { type: "proc_var" } },
									NEXT: { shadow: { type: "proc_var" } },
								},
							},
						},
					},
				},
				{
					kind: "block",
					type: "tuple_single",
					inputs: {
						ELEMENT: { shadow: { type: "proc_var" } },
					},
				},
				{
					kind: "block",
					type: "tuple_multiple",
					inputs: {
						FIRST: { shadow: { type: "proc_var" } },
						REST: {
							shadow: {
								type: "proc_list",
								inputs: {
									ITEM: { shadow: { type: "proc_var" } },
									NEXT: { shadow: { type: "proc_var" } },
								},
							},
						},
					},
				},
				{
					kind: "block",
					type: "collect_set",
					inputs: {
						ELEMENTS: {
							shadow: {
								type: "proc_list",
								inputs: {
									ITEM: { shadow: { type: "proc_var" } },
									NEXT: { shadow: { type: "proc_var" } },
								},
							},
						},
					},
				},
				{ kind: "block", type: "collect_map" },
				{
					kind: "block",
					type: "key_value_pair",
					inputs: {
						KEY: { shadow: { type: "proc_var" } },
						VALUE: { shadow: { type: "proc_var" } },
					},
				},
				{
					kind: "block",
					type: "proc_list",
					inputs: {
						ITEM: { shadow: { type: "proc_var" } },
						NEXT: { shadow: { type: "proc_var" } },
					},
				},
				{ kind: "block", type: "proc_remainder" },
				{
					kind: "block",
					type: "name_list",
					inputs: {
						ITEM: { shadow: { type: "name_var" } },
						NEXT: { shadow: { type: "name_var" } },
					},
				},
			],
		},
		{
			kind: "category",
			name: "Receipts & Binds",
			contents: [
				{
					kind: "block",
					type: "linear_bind",
					inputs: {
						PATTERN: { shadow: { type: "name_var" } },
						SOURCE: { shadow: { type: "name_var" } },
					},
				},
				{
					kind: "block",
					type: "linear_bind_receive_send",
					inputs: {
						PATTERN: { shadow: { type: "name_var" } },
						SOURCE: { shadow: { type: "name_var" } },
					},
				},
				{
					kind: "block",
					type: "linear_bind_send_receive",
					inputs: {
						PATTERN: { shadow: { type: "name_var" } },
						SOURCE: { shadow: { type: "name_var" } },
						ARGS: {
							shadow: {
								type: "proc_list",
								inputs: {
									ITEM: { shadow: { type: "proc_var" } },
									NEXT: { shadow: { type: "proc_var" } },
								},
							},
						},
					},
				},
				{
					kind: "block",
					type: "repeated_bind",
					inputs: {
						PATTERN: { shadow: { type: "name_var" } },
						SOURCE: { shadow: { type: "name_var" } },
					},
				},
				{
					kind: "block",
					type: "peek_bind",
					inputs: {
						PATTERN: { shadow: { type: "name_var" } },
						SOURCE: { shadow: { type: "name_var" } },
					},
				},
				{
					kind: "block",
					type: "receipt_linear",
					inputs: {
						BINDS: {
							shadow: {
								type: "linear_bind",
								inputs: {
									PATTERN: { shadow: { type: "name_var" } },
									SOURCE: { shadow: { type: "name_var" } },
								},
							},
						},
					},
				},
				{
					kind: "block",
					type: "receipt_repeated",
					inputs: {
						BINDS: {
							shadow: {
								type: "repeated_bind",
								inputs: {
									PATTERN: { shadow: { type: "name_var" } },
									SOURCE: { shadow: { type: "name_var" } },
								},
							},
						},
					},
				},
				{
					kind: "block",
					type: "receipt_peek",
					inputs: {
						BINDS: {
							shadow: {
								type: "peek_bind",
								inputs: {
									PATTERN: { shadow: { type: "name_var" } },
									SOURCE: { shadow: { type: "name_var" } },
								},
							},
						},
					},
				},
				{
					kind: "block",
					type: "concurrent_binds",
					inputs: {
						LEFT: {
							shadow: {
								type: "linear_bind",
								inputs: {
									PATTERN: { shadow: { type: "name_var" } },
									SOURCE: { shadow: { type: "name_var" } },
								},
							},
						},
						RIGHT: {
							shadow: {
								type: "linear_bind",
								inputs: {
									PATTERN: { shadow: { type: "name_var" } },
									SOURCE: { shadow: { type: "name_var" } },
								},
							},
						},
					},
				},
				{
					kind: "block",
					type: "sequential_receipts",
					inputs: {
						LEFT: {
							shadow: {
								type: "receipt_linear",
								inputs: {
									BINDS: {
										shadow: {
											type: "linear_bind",
											inputs: {
												PATTERN: { shadow: { type: "name_var" } },
												SOURCE: { shadow: { type: "name_var" } },
											},
										},
									},
								},
							},
						},
						RIGHT: {
							shadow: {
								type: "receipt_linear",
								inputs: {
									BINDS: {
										shadow: {
											type: "linear_bind",
											inputs: {
												PATTERN: { shadow: { type: "name_var" } },
												SOURCE: { shadow: { type: "name_var" } },
											},
										},
									},
								},
							},
						},
					},
				},
				{
					kind: "block",
					type: "linear_bind_symm",
					inputs: {
						PATTERN: { shadow: { type: "name_var" } },
						SOURCE: { shadow: { type: "name_var" } },
					},
				},
				{
					kind: "block",
					type: "repeated_bind_symm",
					inputs: {
						PATTERN: { shadow: { type: "name_var" } },
						SOURCE: { shadow: { type: "name_var" } },
					},
				},
				{
					kind: "block",
					type: "peek_bind_symm",
					inputs: {
						PATTERN: { shadow: { type: "name_var" } },
						SOURCE: { shadow: { type: "name_var" } },
					},
				},
			],
		},
		{
			kind: "category",
			name: "Control Flow",
			contents: [
				{
					kind: "block",
					type: "proc_if",
					inputs: {
						CONDITION: { shadow: { type: "proc_var" } },
					},
				},
				{
					kind: "block",
					type: "proc_if_else",
					inputs: {
						CONDITION: { shadow: { type: "proc_var" } },
					},
				},
				{
					kind: "block",
					type: "proc_match",
					inputs: {
						EXPR: { shadow: { type: "proc_var" } },
					},
				},
				{
					kind: "block",
					type: "case",
					inputs: {
						PATTERN: { shadow: { type: "proc_var" } },
					},
				},
				{ kind: "block", type: "proc_select" },
				{
					kind: "block",
					type: "branch",
					inputs: {
						RECEIPT: {
							shadow: {
								type: "linear_bind",
								inputs: {
									PATTERN: { shadow: { type: "name_var" } },
									SOURCE: { shadow: { type: "name_var" } },
								},
							},
						},
					},
				},
			],
		},
		{
			kind: "category",
			name: "Declarations",
			contents: [
				{
					kind: "block",
					type: "proc_new",
					inputs: {
						NAMES: {
							shadow: {
								type: "name_decl_simple",
							},
						},
					},
				},
				{
					kind: "block",
					type: "name_decl_list",
					inputs: {
						ITEM: { shadow: { type: "name_decl_simple" } },
						NEXT: { shadow: { type: "name_decl_simple" } },
					},
				},
				{
					kind: "block",
					type: "proc_let",
					inputs: {
						DECLS: {
							shadow: {
								type: "decl",
								inputs: {
									NAMES: { shadow: { type: "name_var" } },
									PROCS: { shadow: { type: "proc_var" } },
								},
							},
						},
					},
				},
				{
					kind: "block",
					type: "decl",
					inputs: {
						NAMES: { shadow: { type: "name_var" } },
						PROCS: { shadow: { type: "proc_var" } },
					},
				},
				{
					kind: "block",
					type: "linear_decls",
					inputs: {
						LEFT: {
							shadow: {
								type: "decl",
								inputs: {
									NAMES: { shadow: { type: "name_var" } },
									PROCS: { shadow: { type: "proc_var" } },
								},
							},
						},
						RIGHT: {
							shadow: {
								type: "decl",
								inputs: {
									NAMES: { shadow: { type: "name_var" } },
									PROCS: { shadow: { type: "proc_var" } },
								},
							},
						},
					},
				},
				{
					kind: "block",
					type: "conc_decls",
					inputs: {
						LEFT: {
							shadow: {
								type: "decl",
								inputs: {
									NAMES: { shadow: { type: "name_var" } },
									PROCS: { shadow: { type: "proc_var" } },
								},
							},
						},
						RIGHT: {
							shadow: {
								type: "decl",
								inputs: {
									NAMES: { shadow: { type: "name_var" } },
									PROCS: { shadow: { type: "proc_var" } },
								},
							},
						},
					},
				},
				{
					kind: "block",
					type: "proc_contract",
					inputs: {
						NAME: { shadow: { type: "name_var" } },
						PARAMS: { shadow: { type: "name_var" } },
					},
				},
				{
					kind: "block",
					type: "proc_contract_remainder",
					inputs: {
						NAME: { shadow: { type: "name_var" } },
						PARAMS: { shadow: { type: "name_var" } },
					},
				},
				{ kind: "block", type: "proc_bundle_write" },
				{ kind: "block", type: "proc_bundle_read" },
				{ kind: "block", type: "proc_bundle_equiv" },
				{ kind: "block", type: "proc_bundle_rw" },
			],
		},
		{
			kind: "category",
			name: "Basic Processes",
			contents: [
				{ kind: "block", type: "proc_nil" },
				{
					kind: "block",
					type: "proc_ground",
					inputs: {
						VALUE: { shadow: { type: "ground_int" } },
					},
				},
				{
					kind: "block",
					type: "proc_collect",
					inputs: {
						VALUE: {
							shadow: {
								type: "collect_list",
								inputs: {
									ELEMENTS: {
										shadow: {
											type: "proc_list",
											inputs: {
												ITEM: {
													shadow: {
														type: "proc_var",
													},
												},
												NEXT: {
													shadow: {
														type: "proc_var",
													},
												},
											},
										},
									},
								},
							},
						},
					},
				},
				{ kind: "block", type: "proc_var" },
				{ kind: "block", type: "proc_var_wildcard" },
				{ kind: "block", type: "proc_var_ref" },
				{ kind: "block", type: "proc_var_ref_name" },
				{
					kind: "block",
					type: "proc_simple_type",
					inputs: {
						TYPE: { shadow: { type: "simple_type_int" } },
					},
				},
				{
					kind: "block",
					type: "proc_eval",
					inputs: {
						NAME: { shadow: { type: "name_var" } },
					},
				},
				{
					kind: "block",
					type: "proc_paren",
					inputs: {
						EXPR: { shadow: { type: "proc_var" } },
					},
				},
			],
		},
		{
			kind: "category",
			name: "Logical Operations",
			contents: [
				{
					kind: "block",
					type: "proc_negation",
					inputs: {
						PROC: { shadow: { type: "proc_var" } },
					},
				},
				{
					kind: "block",
					type: "proc_conjunction",
					inputs: {
						LEFT: { shadow: { type: "proc_var" } },
						RIGHT: { shadow: { type: "proc_var" } },
					},
				},
				{
					kind: "block",
					type: "proc_disjunction",
					inputs: {
						LEFT: { shadow: { type: "proc_var" } },
						RIGHT: { shadow: { type: "proc_var" } },
					},
				},
				{
					kind: "block",
					type: "proc_not",
					inputs: {
						PROC: { shadow: { type: "proc_var" } },
					},
				},
				{
					kind: "block",
					type: "proc_and",
					inputs: {
						LEFT: { shadow: { type: "proc_var" } },
						RIGHT: { shadow: { type: "proc_var" } },
					},
				},
				{
					kind: "block",
					type: "proc_or",
					inputs: {
						LEFT: { shadow: { type: "proc_var" } },
						RIGHT: { shadow: { type: "proc_var" } },
					},
				},
			],
		},
		{
			kind: "category",
			name: "Arithmetic",
			contents: [
				{
					kind: "block",
					type: "proc_neg",
					inputs: {
						PROC: { shadow: { type: "proc_var" } },
					},
				},
				{
					kind: "block",
					type: "proc_mult",
					inputs: {
						LEFT: { shadow: { type: "proc_var" } },
						RIGHT: { shadow: { type: "proc_var" } },
					},
				},
				{
					kind: "block",
					type: "proc_div",
					inputs: {
						LEFT: { shadow: { type: "proc_var" } },
						RIGHT: { shadow: { type: "proc_var" } },
					},
				},
				{
					kind: "block",
					type: "proc_mod",
					inputs: {
						LEFT: { shadow: { type: "proc_var" } },
						RIGHT: { shadow: { type: "proc_var" } },
					},
				},
				{
					kind: "block",
					type: "proc_percent_percent",
					inputs: {
						LEFT: { shadow: { type: "proc_var" } },
						RIGHT: { shadow: { type: "proc_var" } },
					},
				},
				{
					kind: "block",
					type: "proc_add",
					inputs: {
						LEFT: { shadow: { type: "proc_var" } },
						RIGHT: { shadow: { type: "proc_var" } },
					},
				},
				{
					kind: "block",
					type: "proc_minus",
					inputs: {
						LEFT: { shadow: { type: "proc_var" } },
						RIGHT: { shadow: { type: "proc_var" } },
					},
				},
				{
					kind: "block",
					type: "proc_plus_plus",
					inputs: {
						LEFT: { shadow: { type: "proc_var" } },
						RIGHT: { shadow: { type: "proc_var" } },
					},
				},
				{
					kind: "block",
					type: "proc_minus_minus",
					inputs: {
						LEFT: { shadow: { type: "proc_var" } },
						RIGHT: { shadow: { type: "proc_var" } },
					},
				},
			],
		},
		{
			kind: "category",
			name: "Comparison",
			contents: [
				{
					kind: "block",
					type: "proc_lt",
					inputs: {
						LEFT: { shadow: { type: "proc_var" } },
						RIGHT: { shadow: { type: "proc_var" } },
					},
				},
				{
					kind: "block",
					type: "proc_lte",
					inputs: {
						LEFT: { shadow: { type: "proc_var" } },
						RIGHT: { shadow: { type: "proc_var" } },
					},
				},
				{
					kind: "block",
					type: "proc_gt",
					inputs: {
						LEFT: { shadow: { type: "proc_var" } },
						RIGHT: { shadow: { type: "proc_var" } },
					},
				},
				{
					kind: "block",
					type: "proc_gte",
					inputs: {
						LEFT: { shadow: { type: "proc_var" } },
						RIGHT: { shadow: { type: "proc_var" } },
					},
				},
				{
					kind: "block",
					type: "proc_eq",
					inputs: {
						LEFT: { shadow: { type: "proc_var" } },
						RIGHT: { shadow: { type: "proc_var" } },
					},
				},
				{
					kind: "block",
					type: "proc_neq",
					inputs: {
						LEFT: { shadow: { type: "proc_var" } },
						RIGHT: { shadow: { type: "proc_var" } },
					},
				},
				{
					kind: "block",
					type: "proc_matches",
					inputs: {
						LEFT: { shadow: { type: "proc_var" } },
						RIGHT: { shadow: { type: "proc_var" } },
					},
				},
			],
		},
		{
			kind: "category",
			name: "Methods & Paths",
			contents: [
				{
					kind: "block",
					type: "proc_method",
					inputs: {
						OBJECT: { shadow: { type: "proc_var" } },
						ARGS: {
							shadow: {
								type: "proc_list",
								inputs: {
									ITEM: { shadow: { type: "proc_var" } },
									NEXT: { shadow: { type: "proc_var" } },
								},
							},
						},
					},
				},
				{
					kind: "block",
					type: "proc_path_map",
					inputs: {
						PROC: { shadow: { type: "proc_var" } },
					},
				},
			],
		},
		{
			kind: "category",
			name: "Send & Receive",
			contents: [
				{
					kind: "block",
					type: "proc_send",
					inputs: {
						CHANNEL: { shadow: { type: "name_var" } },
						ARGS: {
							shadow: {
								type: "proc_list",
								inputs: {
									ITEM: { shadow: { type: "proc_var" } },
									NEXT: { shadow: { type: "proc_var" } },
								},
							},
						},
					},
				},
				{
					kind: "block",
					type: "proc_send_multiple",
					inputs: {
						CHANNEL: { shadow: { type: "name_var" } },
						ARGS: {
							shadow: {
								type: "proc_list",
								inputs: {
									ITEM: { shadow: { type: "proc_var" } },
									NEXT: { shadow: { type: "proc_var" } },
								},
							},
						},
					},
				},
				{
					kind: "block",
					type: "proc_send_symm",
					inputs: {
						CHANNEL: { shadow: { type: "name_var" } },
						ARGS: {
							shadow: {
								type: "proc_list",
								inputs: {
									ITEM: { shadow: { type: "proc_var" } },
									NEXT: { shadow: { type: "proc_var" } },
								},
							},
						},
					},
				},
				{
					kind: "block",
					type: "proc_send_synch",
					inputs: {
						CHANNEL: { shadow: { type: "name_var" } },
						ARGS: {
							shadow: {
								type: "proc_list",
								inputs: {
									ITEM: { shadow: { type: "proc_var" } },
									NEXT: { shadow: { type: "proc_var" } },
								},
							},
						},
						CONT: { shadow: { type: "synch_send_cont_empty" } },
					},
				},
				{ kind: "block", type: "synch_send_cont_empty" },
				{ kind: "block", type: "synch_send_cont" },
				{
					kind: "block",
					type: "proc_for",
					inputs: {
						RECEIPTS: {
							shadow: {
								type: "receipt_linear",
								inputs: {
									BINDS: {
										shadow: {
											type: "linear_bind",
											inputs: {
												PATTERN: { shadow: { type: "name_var" } },
												SOURCE: { shadow: { type: "name_var" } },
											},
										},
									},
								},
							},
						},
					},
				},
				{
					kind: "block",
					type: "proc_foreach",
					inputs: {
						RECEIPTS: {
							shadow: {
								type: "receipt_linear",
								inputs: {
									BINDS: {
										shadow: {
											type: "linear_bind",
											inputs: {
												PATTERN: { shadow: { type: "name_var" } },
												SOURCE: { shadow: { type: "name_var" } },
											},
										},
									},
								},
							},
						},
					},
				},
			],
		},
		{
			kind: "category",
			name: "Composition",
			contents: [{ kind: "block", type: "proc_par" }],
		},
	],
};
