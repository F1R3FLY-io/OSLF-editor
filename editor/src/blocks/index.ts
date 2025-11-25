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
				{ kind: "block", type: "name_quote" },
				{ kind: "block", type: "name_decl_simple" },
				{ kind: "block", type: "name_decl_urn" },
				{ kind: "block", type: "name_remainder" },
			],
		},
		{
			kind: "category",
			name: "Collections",
			contents: [
				{ kind: "block", type: "collect_list" },
				{ kind: "block", type: "collect_list_remainder" },
				{ kind: "block", type: "tuple_single" },
				{ kind: "block", type: "tuple_multiple" },
				{ kind: "block", type: "collect_set" },
				{ kind: "block", type: "collect_map" },
				{ kind: "block", type: "key_value_pair" },
				{ kind: "block", type: "proc_list" },
				{ kind: "block", type: "proc_remainder" },
				{ kind: "block", type: "name_list" },
			],
		},
		{
			kind: "category",
			name: "Receipts & Binds",
			contents: [
				{ kind: "block", type: "linear_bind" },
				{ kind: "block", type: "linear_bind_receive_send" },
				{ kind: "block", type: "linear_bind_send_receive" },
				{ kind: "block", type: "repeated_bind" },
				{ kind: "block", type: "peek_bind" },
				{ kind: "block", type: "receipt_linear" },
				{ kind: "block", type: "receipt_repeated" },
				{ kind: "block", type: "receipt_peek" },
				{ kind: "block", type: "concurrent_binds" },
				{ kind: "block", type: "sequential_receipts" },
				{ kind: "block", type: "linear_bind_symm" },
				{ kind: "block", type: "repeated_bind_symm" },
				{ kind: "block", type: "peek_bind_symm" },
			],
		},
		{
			kind: "category",
			name: "Control Flow",
			contents: [
				{ kind: "block", type: "proc_if" },
				{ kind: "block", type: "proc_if_else" },
				{ kind: "block", type: "proc_match" },
				{ kind: "block", type: "case" },
				{ kind: "block", type: "proc_select" },
				{ kind: "block", type: "branch" },
			],
		},
		{
			kind: "category",
			name: "Declarations",
			contents: [
				{ kind: "block", type: "proc_new" },
				{ kind: "block", type: "name_decl_list" },
				{ kind: "block", type: "proc_let" },
				{ kind: "block", type: "decl" },
				{ kind: "block", type: "linear_decls" },
				{ kind: "block", type: "conc_decls" },
				{ kind: "block", type: "proc_contract" },
				{ kind: "block", type: "proc_contract_remainder" },
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
				{ kind: "block", type: "proc_ground" },
				{ kind: "block", type: "proc_collect" },
				{ kind: "block", type: "proc_var" },
				{ kind: "block", type: "proc_var_wildcard" },
				{ kind: "block", type: "proc_var_ref" },
				{ kind: "block", type: "proc_var_ref_name" },
				{ kind: "block", type: "proc_simple_type" },
				{ kind: "block", type: "proc_eval" },
				{ kind: "block", type: "proc_paren" },
			],
		},
		{
			kind: "category",
			name: "Logical Operations",
			contents: [
				{ kind: "block", type: "proc_negation" },
				{ kind: "block", type: "proc_conjunction" },
				{ kind: "block", type: "proc_disjunction" },
				{ kind: "block", type: "proc_not" },
				{ kind: "block", type: "proc_and" },
				{ kind: "block", type: "proc_or" },
			],
		},
		{
			kind: "category",
			name: "Arithmetic",
			contents: [
				{ kind: "block", type: "proc_neg" },
				{ kind: "block", type: "proc_mult" },
				{ kind: "block", type: "proc_div" },
				{ kind: "block", type: "proc_mod" },
				{ kind: "block", type: "proc_percent_percent" },
				{ kind: "block", type: "proc_add" },
				{ kind: "block", type: "proc_minus" },
				{ kind: "block", type: "proc_plus_plus" },
				{ kind: "block", type: "proc_minus_minus" },
			],
		},
		{
			kind: "category",
			name: "Comparison",
			contents: [
				{ kind: "block", type: "proc_lt" },
				{ kind: "block", type: "proc_lte" },
				{ kind: "block", type: "proc_gt" },
				{ kind: "block", type: "proc_gte" },
				{ kind: "block", type: "proc_eq" },
				{ kind: "block", type: "proc_neq" },
				{ kind: "block", type: "proc_matches" },
			],
		},
		{
			kind: "category",
			name: "Methods & Paths",
			contents: [
				{ kind: "block", type: "proc_method" },
				{ kind: "block", type: "proc_path_map" },
			],
		},
		{
			kind: "category",
			name: "Send & Receive",
			contents: [
				{ kind: "block", type: "proc_send" },
				{ kind: "block", type: "proc_send_multiple" },
				{ kind: "block", type: "proc_send_symm" },
				{ kind: "block", type: "proc_send_synch" },
				{ kind: "block", type: "synch_send_cont_empty" },
				{ kind: "block", type: "synch_send_cont" },
				{ kind: "block", type: "proc_for" },
				{ kind: "block", type: "proc_foreach" },
			],
		},
		{
			kind: "category",
			name: "Composition",
			contents: [
				{ kind: "block", type: "proc_par" },
			],
		},
	],
};
