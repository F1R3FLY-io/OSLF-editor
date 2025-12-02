import * as Blockly from "blockly/core";

// RhoLang code generator for blocks_2
// This creates generator functions for all RhoLang blocks

export function createRholangGenerator(): Blockly.CodeGenerator {
	const generator = new Blockly.CodeGenerator("Rholang");

	// Set operator precedence (higher number = lower precedence)
	const ORDER = {
		ATOMIC: 0,          // Literals, variables
		MEMBER: 1,          // . (method call)
		UNARY: 2,           // - ~ not * @ %
		MULTIPLICATIVE: 3,  // * / %
		ADDITIVE: 4,        // + - ++ --
		RELATIONAL: 5,      // < <= > >=
		EQUALITY: 6,        // == != matches
		CONJUNCTION: 7,     // /\
		DISJUNCTION: 8,     // \/
		AND: 9,             // and
		OR: 10,             // or
		PARALLEL: 11,       // |
		NONE: 99,
	};

	// === Root Block ===

	generator.forBlock["proc_root"] = function(block) {
		const body = generator.statementToCode(block, "BODY");
		return body;
	};

	// === Ground Types ===

	generator.forBlock["ground_bool_true"] = function() {
		return ["true", ORDER.ATOMIC];
	};

	generator.forBlock["ground_bool_false"] = function() {
		return ["false", ORDER.ATOMIC];
	};

	generator.forBlock["ground_int"] = function(block) {
		const value = block.getFieldValue("VALUE");
		return [String(value), ORDER.ATOMIC];
	};

	generator.forBlock["ground_string"] = function(block) {
		const value = block.getFieldValue("VALUE");
		return [`"${value}"`, ORDER.ATOMIC];
	};

	generator.forBlock["ground_uri"] = function(block) {
		const value = block.getFieldValue("VALUE");
		return [`\`${value}\``, ORDER.ATOMIC];
	};

	generator.forBlock["simple_type_bool"] = function() {
		return ["Bool", ORDER.ATOMIC];
	};

	generator.forBlock["simple_type_int"] = function() {
		return ["Int", ORDER.ATOMIC];
	};

	generator.forBlock["simple_type_string"] = function() {
		return ["String", ORDER.ATOMIC];
	};

	generator.forBlock["simple_type_uri"] = function() {
		return ["Uri", ORDER.ATOMIC];
	};

	generator.forBlock["simple_type_byte_array"] = function() {
		return ["ByteArray", ORDER.ATOMIC];
	};

	// === Names ===

	generator.forBlock["name_wildcard"] = function() {
		return ["_", ORDER.ATOMIC];
	};

	generator.forBlock["name_var"] = function(block) {
		const varName = block.getFieldValue("VAR");
		return [varName, ORDER.ATOMIC];
	};

	generator.forBlock["name_quote"] = function(block) {
		const proc = generator.valueToCode(block, "PROC", ORDER.UNARY);
		return [`@${proc}`, ORDER.UNARY];
	};

	generator.forBlock["name_decl_simple"] = function(block) {
		const varName = block.getFieldValue("VAR");
		return [varName, ORDER.ATOMIC];
	};

	generator.forBlock["name_decl_urn"] = function(block) {
		const varName = block.getFieldValue("VAR");
		const urn = block.getFieldValue("URN");
		return [`${varName}(\`${urn}\`)`, ORDER.ATOMIC];
	};

	generator.forBlock["name_remainder"] = function(block) {
		const varName = block.getFieldValue("VAR");
		return [`...@${varName}`, ORDER.ATOMIC];
	};

	generator.forBlock["name_remainder_empty"] = function() {
		return ["", ORDER.ATOMIC];
	};

	// === Collections ===

	generator.forBlock["collect_list"] = function(block) {
		const elements = generator.valueToCode(block, "ELEMENTS", ORDER.NONE);
		return [`[${elements}]`, ORDER.ATOMIC];
	};

	generator.forBlock["collect_list_remainder"] = function(block) {
		const elements = generator.valueToCode(block, "ELEMENTS", ORDER.NONE);
		const remainder = generator.valueToCode(block, "REMAINDER", ORDER.NONE);
		return [`[${elements}${remainder}]`, ORDER.ATOMIC];
	};

	generator.forBlock["tuple_single"] = function(block) {
		const element = generator.valueToCode(block, "ELEMENT", ORDER.NONE);
		return [`(${element},)`, ORDER.ATOMIC];
	};

	generator.forBlock["tuple_multiple"] = function(block) {
		const first = generator.valueToCode(block, "FIRST", ORDER.NONE);
		const rest = generator.valueToCode(block, "REST", ORDER.NONE);
		return [`(${first}, ${rest})`, ORDER.ATOMIC];
	};

	generator.forBlock["collect_set"] = function(block) {
		const elements = generator.valueToCode(block, "ELEMENTS", ORDER.NONE);
		return [`Set(${elements})`, ORDER.ATOMIC];
	};

	generator.forBlock["collect_set_remainder"] = function(block) {
		const elements = generator.valueToCode(block, "ELEMENTS", ORDER.NONE);
		const remainder = generator.valueToCode(block, "REMAINDER", ORDER.NONE);
		return [`Set(${elements}${remainder})`, ORDER.ATOMIC];
	};

	generator.forBlock["collect_map"] = function(block) {
		const pairsCode = generator.statementToCode(block, "PAIRS");
		// Convert statement blocks to comma-separated list
		const pairs = pairsCode
			.split('\n')
			.map(line => line.trim())
			.filter(line => line.length > 0)
			.join(', ');
		return [`{${pairs}}`, ORDER.ATOMIC];
	};

	generator.forBlock["collect_map_remainder"] = function(block) {
		const pairsCode = generator.statementToCode(block, "PAIRS");
		// Convert statement blocks to comma-separated list
		const pairs = pairsCode
			.split('\n')
			.map(line => line.trim())
			.filter(line => line.length > 0)
			.join(', ');
		const remainder = generator.valueToCode(block, "REMAINDER", ORDER.NONE);
		return [`{${pairs}${remainder}}`, ORDER.ATOMIC];
	};

	generator.forBlock["key_value_pair"] = function(block) {
		const key = generator.valueToCode(block, "KEY", ORDER.NONE);
		const value = generator.valueToCode(block, "VALUE", ORDER.NONE);
		return `${key}: ${value}\n`;
	};

	generator.forBlock["proc_list"] = function(block) {
		const item = generator.valueToCode(block, "ITEM", ORDER.NONE);
		const next = generator.valueToCode(block, "NEXT", ORDER.NONE);
		return [`${item}, ${next}`, ORDER.NONE];
	};

	generator.forBlock["proc_remainder"] = function(block) {
		const varName = block.getFieldValue("VAR");
		return [`...${varName}`, ORDER.ATOMIC];
	};

	generator.forBlock["proc_remainder_empty"] = function() {
		return ["", ORDER.ATOMIC];
	};

	generator.forBlock["name_list"] = function(block) {
		const item = generator.valueToCode(block, "ITEM", ORDER.NONE);
		const next = generator.valueToCode(block, "NEXT", ORDER.NONE);
		return [`${item}, ${next}`, ORDER.NONE];
	};

	// === Receipts & Binds ===

	generator.forBlock["linear_bind"] = function(block) {
		const pattern = generator.valueToCode(block, "PATTERN", ORDER.NONE);
		const source = generator.valueToCode(block, "SOURCE", ORDER.NONE);
		return [`${pattern} <- ${source}`, ORDER.NONE];
	};

	generator.forBlock["linear_bind_receive_send"] = function(block) {
		const pattern = generator.valueToCode(block, "PATTERN", ORDER.NONE);
		const source = generator.valueToCode(block, "SOURCE", ORDER.NONE);
		return [`${pattern} <- ${source}?!`, ORDER.NONE];
	};

	generator.forBlock["linear_bind_send_receive"] = function(block) {
		const pattern = generator.valueToCode(block, "PATTERN", ORDER.NONE);
		const source = generator.valueToCode(block, "SOURCE", ORDER.NONE);
		const args = generator.valueToCode(block, "ARGS", ORDER.NONE);
		return [`${pattern} <- ${source}!?(${args})`, ORDER.NONE];
	};

	generator.forBlock["repeated_bind"] = function(block) {
		const pattern = generator.valueToCode(block, "PATTERN", ORDER.NONE);
		const source = generator.valueToCode(block, "SOURCE", ORDER.NONE);
		return [`${pattern} <= ${source}`, ORDER.NONE];
	};

	generator.forBlock["peek_bind"] = function(block) {
		const pattern = generator.valueToCode(block, "PATTERN", ORDER.NONE);
		const source = generator.valueToCode(block, "SOURCE", ORDER.NONE);
		return [`${pattern} <<- ${source}`, ORDER.NONE];
	};

	generator.forBlock["receipt_linear"] = function(block) {
		const binds = generator.valueToCode(block, "BINDS", ORDER.NONE);
		return [binds, ORDER.NONE];
	};

	generator.forBlock["receipt_repeated"] = function(block) {
		const binds = generator.valueToCode(block, "BINDS", ORDER.NONE);
		return [binds, ORDER.NONE];
	};

	generator.forBlock["receipt_peek"] = function(block) {
		const binds = generator.valueToCode(block, "BINDS", ORDER.NONE);
		return [binds, ORDER.NONE];
	};

	generator.forBlock["concurrent_binds"] = function(block) {
		const left = generator.valueToCode(block, "LEFT", ORDER.NONE);
		const right = generator.valueToCode(block, "RIGHT", ORDER.NONE);
		return [`${left} & ${right}`, ORDER.NONE];
	};

	generator.forBlock["sequential_receipts"] = function(block) {
		const left = generator.valueToCode(block, "LEFT", ORDER.NONE);
		const right = generator.valueToCode(block, "RIGHT", ORDER.NONE);
		return [`${left}; ${right}`, ORDER.NONE];
	};

	generator.forBlock["linear_bind_symm"] = function(block) {
		const pattern = generator.valueToCode(block, "PATTERN", ORDER.NONE);
		const source = generator.valueToCode(block, "SOURCE", ORDER.NONE);
		return [`${pattern} <-> ${source}`, ORDER.NONE];
	};

	generator.forBlock["repeated_bind_symm"] = function(block) {
		const pattern = generator.valueToCode(block, "PATTERN", ORDER.NONE);
		const source = generator.valueToCode(block, "SOURCE", ORDER.NONE);
		return [`${pattern} <=> ${source}`, ORDER.NONE];
	};

	generator.forBlock["peek_bind_symm"] = function(block) {
		const pattern = generator.valueToCode(block, "PATTERN", ORDER.NONE);
		const source = generator.valueToCode(block, "SOURCE", ORDER.NONE);
		return [`${pattern} <<->> ${source}`, ORDER.NONE];
	};

	// === Control Flow ===

	generator.forBlock["proc_if"] = function(block) {
		const condition = generator.valueToCode(block, "CONDITION", ORDER.NONE);
		const body = generator.statementToCode(block, "BODY");
		return `if (${condition}) {\n${body}}\n`;
	};

	generator.forBlock["proc_if_else"] = function(block) {
		const condition = generator.valueToCode(block, "CONDITION", ORDER.NONE);
		const thenBody = generator.statementToCode(block, "THEN_BODY");
		const elseBody = generator.statementToCode(block, "ELSE_BODY");
		return `if (${condition}) {\n${thenBody}} else {\n${elseBody}}\n`;
	};

	generator.forBlock["proc_match"] = function(block) {
		const expr = generator.valueToCode(block, "EXPR", ORDER.NONE);
		const cases = generator.statementToCode(block, "CASES");
		return `match ${expr} {\n${cases}}\n`;
	};

	generator.forBlock["case"] = function(block) {
		const pattern = generator.valueToCode(block, "PATTERN", ORDER.NONE);
		const body = generator.statementToCode(block, "BODY");
		return `${pattern} => {\n${body}}\n`;
	};

	generator.forBlock["proc_select"] = function(block) {
		const branches = generator.statementToCode(block, "BRANCHES");
		return `select {\n${branches}}\n`;
	};

	generator.forBlock["branch"] = function(block) {
		const receipt = generator.valueToCode(block, "RECEIPT", ORDER.NONE);
		const body = generator.statementToCode(block, "BODY");
		return `${receipt} => {\n${body}}\n`;
	};

	// === Declarations ===

	generator.forBlock["proc_new"] = function(block) {
		const names = generator.valueToCode(block, "NAMES", ORDER.NONE);
		const body = generator.statementToCode(block, "BODY");
		return `new ${names} in {\n${body}}\n`;
	};

	generator.forBlock["name_decl_list"] = function(block) {
		const item = generator.valueToCode(block, "ITEM", ORDER.NONE);
		const next = generator.valueToCode(block, "NEXT", ORDER.NONE);
		return [`${item}, ${next}`, ORDER.NONE];
	};

	generator.forBlock["proc_let"] = function(block) {
		const decls = generator.valueToCode(block, "DECLS", ORDER.NONE);
		const body = generator.statementToCode(block, "BODY");
		return `let ${decls} in {\n${body}}\n`;
	};

	generator.forBlock["decl"] = function(block) {
		const names = generator.valueToCode(block, "NAMES", ORDER.NONE);
		const procs = generator.valueToCode(block, "PROCS", ORDER.NONE);
		return [`${names} <- ${procs}`, ORDER.NONE];
	};

	generator.forBlock["linear_decls"] = function(block) {
		const left = generator.valueToCode(block, "LEFT", ORDER.NONE);
		const right = generator.valueToCode(block, "RIGHT", ORDER.NONE);
		return [`${left}; ${right}`, ORDER.NONE];
	};

	generator.forBlock["conc_decls"] = function(block) {
		const left = generator.valueToCode(block, "LEFT", ORDER.NONE);
		const right = generator.valueToCode(block, "RIGHT", ORDER.NONE);
		return [`${left} & ${right}`, ORDER.NONE];
	};

	generator.forBlock["proc_contract"] = function(block) {
		const name = generator.valueToCode(block, "NAME", ORDER.NONE);
		const params = generator.valueToCode(block, "PARAMS", ORDER.NONE);
		const body = generator.statementToCode(block, "BODY");
		return `contract ${name}(${params}) = {\n${body}}\n`;
	};

	generator.forBlock["proc_contract_remainder"] = function(block) {
		const name = generator.valueToCode(block, "NAME", ORDER.NONE);
		const params = generator.valueToCode(block, "PARAMS", ORDER.NONE);
		const remainder = block.getFieldValue("REMAINDER");
		const body = generator.statementToCode(block, "BODY");
		return `contract ${name}(${params}...@${remainder}) = {\n${body}}\n`;
	};

	generator.forBlock["proc_bundle_write"] = function(block) {
		const body = generator.statementToCode(block, "BODY");
		return `bundle+ {\n${body}}\n`;
	};

	generator.forBlock["proc_bundle_read"] = function(block) {
		const body = generator.statementToCode(block, "BODY");
		return `bundle- {\n${body}}\n`;
	};

	generator.forBlock["proc_bundle_equiv"] = function(block) {
		const body = generator.statementToCode(block, "BODY");
		return `bundle0 {\n${body}}\n`;
	};

	generator.forBlock["proc_bundle_rw"] = function(block) {
		const body = generator.statementToCode(block, "BODY");
		return `bundle {\n${body}}\n`;
	};

	// === Basic Processes ===

	generator.forBlock["proc_nil"] = function() {
		return ["Nil", ORDER.ATOMIC];
	};

	generator.forBlock["proc_collect"] = function(block) {
		const value = generator.valueToCode(block, "VALUE", ORDER.NONE);
		return [value, ORDER.ATOMIC];
	};

	generator.forBlock["proc_var"] = function(block) {
		const varName = block.getFieldValue("VAR");
		return [varName, ORDER.ATOMIC];
	};

	generator.forBlock["proc_var_wildcard"] = function() {
		return ["_", ORDER.ATOMIC];
	};

	generator.forBlock["proc_var_ref"] = function(block) {
		const varName = block.getFieldValue("VAR");
		return [`=${varName}`, ORDER.UNARY];
	};

	generator.forBlock["proc_var_ref_name"] = function(block) {
		const varName = block.getFieldValue("VAR");
		return [`=*${varName}`, ORDER.UNARY];
	};

	generator.forBlock["proc_simple_type"] = function(block) {
		const type = generator.valueToCode(block, "TYPE", ORDER.NONE);
		return [type, ORDER.ATOMIC];
	};

	generator.forBlock["proc_eval"] = function(block) {
		const name = generator.valueToCode(block, "NAME", ORDER.UNARY);
		return [`*${name}`, ORDER.UNARY];
	};

	generator.forBlock["proc_paren"] = function(block) {
		const expr = generator.valueToCode(block, "EXPR", ORDER.NONE);
		return [`(${expr})`, ORDER.ATOMIC];
	};

	// === Logical Operations ===

	generator.forBlock["proc_negation"] = function(block) {
		const proc = generator.valueToCode(block, "PROC", ORDER.UNARY);
		return [`~${proc}`, ORDER.UNARY];
	};

	generator.forBlock["proc_conjunction"] = function(block) {
		const left = generator.valueToCode(block, "LEFT", ORDER.CONJUNCTION);
		const right = generator.valueToCode(block, "RIGHT", ORDER.CONJUNCTION);
		return [`${left} /\\ ${right}`, ORDER.CONJUNCTION];
	};

	generator.forBlock["proc_disjunction"] = function(block) {
		const left = generator.valueToCode(block, "LEFT", ORDER.DISJUNCTION);
		const right = generator.valueToCode(block, "RIGHT", ORDER.DISJUNCTION);
		return [`${left} \\/ ${right}`, ORDER.DISJUNCTION];
	};

	generator.forBlock["proc_not"] = function(block) {
		const proc = generator.valueToCode(block, "PROC", ORDER.UNARY);
		return [`not ${proc}`, ORDER.UNARY];
	};

	generator.forBlock["proc_and"] = function(block) {
		const left = generator.valueToCode(block, "LEFT", ORDER.AND);
		const right = generator.valueToCode(block, "RIGHT", ORDER.AND);
		return [`${left} and ${right}`, ORDER.AND];
	};

	generator.forBlock["proc_or"] = function(block) {
		const left = generator.valueToCode(block, "LEFT", ORDER.OR);
		const right = generator.valueToCode(block, "RIGHT", ORDER.OR);
		return [`${left} or ${right}`, ORDER.OR];
	};

	// === Arithmetic Operations ===

	generator.forBlock["proc_neg"] = function(block) {
		const proc = generator.valueToCode(block, "PROC", ORDER.UNARY);
		return [`-${proc}`, ORDER.UNARY];
	};

	generator.forBlock["proc_mult"] = function(block) {
		const left = generator.valueToCode(block, "LEFT", ORDER.MULTIPLICATIVE);
		const right = generator.valueToCode(block, "RIGHT", ORDER.MULTIPLICATIVE);
		return [`${left} * ${right}`, ORDER.MULTIPLICATIVE];
	};

	generator.forBlock["proc_div"] = function(block) {
		const left = generator.valueToCode(block, "LEFT", ORDER.MULTIPLICATIVE);
		const right = generator.valueToCode(block, "RIGHT", ORDER.MULTIPLICATIVE);
		return [`${left} / ${right}`, ORDER.MULTIPLICATIVE];
	};

	generator.forBlock["proc_mod"] = function(block) {
		const left = generator.valueToCode(block, "LEFT", ORDER.MULTIPLICATIVE);
		const right = generator.valueToCode(block, "RIGHT", ORDER.MULTIPLICATIVE);
		return [`${left} % ${right}`, ORDER.MULTIPLICATIVE];
	};

	generator.forBlock["proc_percent_percent"] = function(block) {
		const left = generator.valueToCode(block, "LEFT", ORDER.MULTIPLICATIVE);
		const right = generator.valueToCode(block, "RIGHT", ORDER.MULTIPLICATIVE);
		return [`${left} %% ${right}`, ORDER.MULTIPLICATIVE];
	};

	generator.forBlock["proc_add"] = function(block) {
		const left = generator.valueToCode(block, "LEFT", ORDER.ADDITIVE);
		const right = generator.valueToCode(block, "RIGHT", ORDER.ADDITIVE);
		return [`${left} + ${right}`, ORDER.ADDITIVE];
	};

	generator.forBlock["proc_minus"] = function(block) {
		const left = generator.valueToCode(block, "LEFT", ORDER.ADDITIVE);
		const right = generator.valueToCode(block, "RIGHT", ORDER.ADDITIVE);
		return [`${left} - ${right}`, ORDER.ADDITIVE];
	};

	generator.forBlock["proc_plus_plus"] = function(block) {
		const left = generator.valueToCode(block, "LEFT", ORDER.ADDITIVE);
		const right = generator.valueToCode(block, "RIGHT", ORDER.ADDITIVE);
		return [`${left} ++ ${right}`, ORDER.ADDITIVE];
	};

	generator.forBlock["proc_minus_minus"] = function(block) {
		const left = generator.valueToCode(block, "LEFT", ORDER.ADDITIVE);
		const right = generator.valueToCode(block, "RIGHT", ORDER.ADDITIVE);
		return [`${left} -- ${right}`, ORDER.ADDITIVE];
	};

	// === Comparison Operations ===

	generator.forBlock["proc_lt"] = function(block) {
		const left = generator.valueToCode(block, "LEFT", ORDER.RELATIONAL);
		const right = generator.valueToCode(block, "RIGHT", ORDER.RELATIONAL);
		return [`${left} < ${right}`, ORDER.RELATIONAL];
	};

	generator.forBlock["proc_lte"] = function(block) {
		const left = generator.valueToCode(block, "LEFT", ORDER.RELATIONAL);
		const right = generator.valueToCode(block, "RIGHT", ORDER.RELATIONAL);
		return [`${left} <= ${right}`, ORDER.RELATIONAL];
	};

	generator.forBlock["proc_gt"] = function(block) {
		const left = generator.valueToCode(block, "LEFT", ORDER.RELATIONAL);
		const right = generator.valueToCode(block, "RIGHT", ORDER.RELATIONAL);
		return [`${left} > ${right}`, ORDER.RELATIONAL];
	};

	generator.forBlock["proc_gte"] = function(block) {
		const left = generator.valueToCode(block, "LEFT", ORDER.RELATIONAL);
		const right = generator.valueToCode(block, "RIGHT", ORDER.RELATIONAL);
		return [`${left} >= ${right}`, ORDER.RELATIONAL];
	};

	generator.forBlock["proc_eq"] = function(block) {
		const left = generator.valueToCode(block, "LEFT", ORDER.EQUALITY);
		const right = generator.valueToCode(block, "RIGHT", ORDER.EQUALITY);
		return [`${left} == ${right}`, ORDER.EQUALITY];
	};

	generator.forBlock["proc_neq"] = function(block) {
		const left = generator.valueToCode(block, "LEFT", ORDER.EQUALITY);
		const right = generator.valueToCode(block, "RIGHT", ORDER.EQUALITY);
		return [`${left} != ${right}`, ORDER.EQUALITY];
	};

	generator.forBlock["proc_matches"] = function(block) {
		const left = generator.valueToCode(block, "LEFT", ORDER.EQUALITY);
		const right = generator.valueToCode(block, "RIGHT", ORDER.EQUALITY);
		return [`${left} matches ${right}`, ORDER.EQUALITY];
	};

	// === Method and Path Operations ===

	generator.forBlock["proc_method"] = function(block) {
		const obj = generator.valueToCode(block, "OBJECT", ORDER.MEMBER);
		const method = block.getFieldValue("METHOD");
		const args = generator.valueToCode(block, "ARGS", ORDER.NONE);
		return [`${obj}.${method}(${args})`, ORDER.MEMBER];
	};

	generator.forBlock["proc_path_map"] = function(block) {
		const proc = generator.valueToCode(block, "PROC", ORDER.UNARY);
		return [`%${proc}`, ORDER.UNARY];
	};

	// === Send Operations ===

	generator.forBlock["proc_send"] = function(block) {
		const channel = generator.valueToCode(block, "CHANNEL", ORDER.NONE);
		const args = generator.valueToCode(block, "ARGS", ORDER.NONE);
		return `${channel}!(${args})\n`;
	};

	generator.forBlock["proc_send_multiple"] = function(block) {
		const channel = generator.valueToCode(block, "CHANNEL", ORDER.NONE);
		const args = generator.valueToCode(block, "ARGS", ORDER.NONE);
		return `${channel}!!(${args})\n`;
	};

	generator.forBlock["proc_send_symm"] = function(block) {
		const channel = generator.valueToCode(block, "CHANNEL", ORDER.NONE);
		const args = generator.valueToCode(block, "ARGS", ORDER.NONE);
		return `${channel}!$(${args})\n`;
	};

	generator.forBlock["proc_send_synch"] = function(block) {
		const channel = generator.valueToCode(block, "CHANNEL", ORDER.NONE);
		const args = generator.valueToCode(block, "ARGS", ORDER.NONE);
		const cont = generator.valueToCode(block, "CONT", ORDER.NONE);
		return `${channel}!?(${args})${cont}\n`;
	};

	generator.forBlock["synch_send_cont_empty"] = function() {
		return [".", ORDER.ATOMIC];
	};

	generator.forBlock["synch_send_cont"] = function(block) {
		const body = generator.statementToCode(block, "BODY");
		return [`; ${body}`, ORDER.NONE];
	};

	// === Input Operations ===

	generator.forBlock["proc_for"] = function(block) {
		const receipts = generator.valueToCode(block, "RECEIPTS", ORDER.NONE);
		const body = generator.statementToCode(block, "BODY");
		return `for (${receipts}) {\n${body}}\n`;
	};

	generator.forBlock["proc_foreach"] = function(block) {
		const receipts = generator.valueToCode(block, "RECEIPTS", ORDER.NONE);
		const body = generator.statementToCode(block, "BODY");
		return `foreach (${receipts}) {\n${body}}\n`;
	};

	// === Parallel Composition ===

	generator.forBlock["proc_par"] = function(block) {
		const left = generator.statementToCode(block, "LEFT");
		const right = generator.statementToCode(block, "RIGHT");
		return `${left} | ${right}\n`;
	};

	return generator;
}

export default createRholangGenerator;
