import * as Blockly from "blockly/core";
import type { BlockDefinition } from "blockly/core/blocks";

/**
 * Order of operations for RhoLang code generation.
 * Higher numbers have lower precedence.
 */
export const Order = {
    ATOMIC: 0, // Literals, variables, parenthesized expressions
    UNARY: 1, // Unary operators (*, @)
    MULTIPLICATIVE: 2, // Multiplication, division
    ADDITIVE: 3, // Addition, subtraction
    RELATIONAL: 4, // Comparisons (<, >, <=, >=)
    EQUALITY: 5, // Equality (==, !=)
    LOGICAL_AND: 6, // Logical AND (and)
    LOGICAL_OR: 7, // Logical OR (or)
    NONE: 99, // No precedence (statements)
} as const;

export type OrderType = (typeof Order)[keyof typeof Order];

/**
 * RhoLang code generator based on Blockly's CodeGenerator.
 * Uses the message0 field from block definitions as the code template.
 */
export class RhoLangGenerator extends Blockly.CodeGenerator {
    /** Mapping of block types to their original definitions for code generation */
    private blockDefinitions: Map<string, BlockDefinition> = new Map();

    constructor(name = "RhoLang") {
        super(name);

        // Configure statement prefix/suffix if needed
        this.STATEMENT_PREFIX = "";
        this.STATEMENT_SUFFIX = "";

        // Configure indent
        this.INDENT = "  ";
    }

    /**
     * Registers block definitions for code generation.
     * This extracts the message0 template and args0 to generate code.
     */
    registerBlockDefinitions(blocks: BlockDefinition[]): void {
        for (const block of blocks) {
            if (block.type && block.message0 !== undefined) {
                this.blockDefinitions.set(block.type, block);
                this.registerBlockGenerator(block);
            }
        }
    }

    /**
     * Creates a code generator function for a block based on its definition.
     * Uses message0 as the code template.
     */
    private registerBlockGenerator(definition: BlockDefinition): void {
        const generator = this;

        this.forBlock[definition.type] = function (
            block: Blockly.Block,
            _generator: Blockly.CodeGenerator,
        ): string | [string, OrderType] {
            return generator.generateCodeFromMessage(block, definition);
        };
    }

    /**
     * Generates code for a block by parsing its message0 template
     * and replacing %N placeholders with actual values.
     */
    private generateCodeFromMessage(
        block: Blockly.Block,
        definition: BlockDefinition,
    ): string | [string, OrderType] {
        const message = definition.message0 || "";
        const args = definition.args0 || [];

        // Build a map of argument index to argument definition
        const argMap = new Map<number, (typeof args)[0]>();
        args.forEach((arg, index) => {
            argMap.set(index + 1, arg); // %1 corresponds to args0[0]
        });

        // Replace %N placeholders with actual values
        let code = message.replace(/%(\d+)/g, (_match, numStr) => {
            const num = parseInt(numStr, 10);
            const arg = argMap.get(num);

            if (!arg) {
                return `%${num}`; // Keep placeholder if no matching arg
            }

            return this.getArgumentCode(block, arg);
        });

        // Determine if this is a value block (has output) or statement block
        const hasOutput = definition.output !== undefined;

        if (hasOutput) {
            // Value blocks return [code, precedence]
            return [code, Order.ATOMIC];
        } else {
            // Statement blocks return code with newline
            code = code.trimEnd();
            if (!code.endsWith("\n")) {
                code += "\n";
            }
            return code;
        }
    }

    /**
     * Gets the code for a specific block argument based on its type.
     */
    private getArgumentCode(
        block: Blockly.Block,
        arg: { type: string; name?: string; text?: string },
    ): string {
        const name = arg.name || "";

        switch (arg.type) {
            case "input_value": {
                // Value input - get code from connected block
                const valueCode = this.valueToCode(block, name, Order.ATOMIC);
                return valueCode || "";
            }

            case "input_statement": {
                // Statement input - get code from nested blocks
                const statementCode = this.statementToCode(block, name);
                return statementCode || "";
            }

            case "field_input":
            case "field_text": {
                // Text field - get the field value directly
                return block.getFieldValue(name) || arg.text || "";
            }

            case "field_number": {
                // Number field
                const value = block.getFieldValue(name);
                return value !== null ? String(value) : "0";
            }

            case "field_dropdown": {
                // Dropdown field
                return block.getFieldValue(name) || "";
            }

            case "field_checkbox": {
                // Checkbox field
                return block.getFieldValue(name) === "TRUE" ? "true" : "false";
            }

            case "field_variable": {
                // Variable field - get variable name via getId and workspace lookup
                const varId = block.getFieldValue(name);
                if (varId) {
                    const variable = block.workspace.getVariableById(varId);
                    // Use unknown cast to safely access name property
                    if (variable) {
                        const varObj = variable as unknown as { name: string };
                        return varObj.name || varId;
                    }
                }
                return varId || "";
            }

            default: {
                // Unknown field type - try to get field value
                const fieldValue = block.getFieldValue(name);
                return fieldValue !== null ? String(fieldValue) : "";
            }
        }
    }

    /**
     * Hook called before generating code.
     * Initialize any state needed for code generation.
     */
    init(workspace: Blockly.Workspace): void {
        super.init(workspace);
        // Reset any generator state here if needed
    }

    /**
     * Hook called after generating code.
     * Clean up any state.
     */
    finish(code: string): string {
        return super.finish(code);
    }

    /**
     * Common tasks for generating code from blocks.
     * Called on every block that isn't disabled.
     */
    scrubNakedValue(line: string): string {
        // Naked values are top-level blocks with outputs, not plugged into anything
        return line + "\n";
    }

    /**
     * Generate code for all blocks in the workspace.
     */
    workspaceToCode(workspace: Blockly.Workspace): string {
        return super.workspaceToCode(workspace);
    }

    /**
     * Gets the code from a value input connection.
     * Wraps in parentheses if needed based on precedence.
     */
    valueToCode(
        block: Blockly.Block,
        name: string,
        outerOrder: OrderType,
    ): string {
        return super.valueToCode(block, name, outerOrder) || "";
    }

    /**
     * Gets the code from a statement input (nested blocks).
     */
    statementToCode(block: Blockly.Block, name: string): string {
        const code = super.statementToCode(block, name);
        // Indent nested statements
        return code;
    }
}

// Create a singleton instance of the generator
export const rhoLangGenerator = new RhoLangGenerator();

/**
 * Generates RhoLang code from a Blockly workspace.
 *
 * @param workspace - The Blockly workspace to generate code from
 * @returns The generated RhoLang code string
 */
export function generateCode(workspace: Blockly.Workspace): string {
    return rhoLangGenerator.workspaceToCode(workspace);
}

/**
 * Registers block definitions with the RhoLang generator.
 * Must be called after blocks are loaded to enable code generation.
 *
 * @param blocks - Array of block definitions to register
 */
export function registerBlocks(blocks: BlockDefinition[]): void {
    rhoLangGenerator.registerBlockDefinitions(blocks);
}
