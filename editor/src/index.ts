import * as Blockly from "blockly/core";
import { BlockDefinition } from "blockly/core/blocks";
import { initEditor } from "./initEditor";
import "./components/input-search";
import {
    rhoLangGenerator,
    generateCode,
    registerBlocks,
    Order,
    RhoLangGenerator,
} from "./generator";

export enum Events {
    INIT = "blockly:init",
    ON_CHANGE = "blockly:on_change",
}

// Module-level state for block filtering
let originalBlocks: BlockDefinition[] = [];
let searchDebounceTimer: ReturnType<typeof setTimeout> | null = null;

const DEFAULT_TOOLBOX = {
    kind: "categoryToolbox",
    contents: [
        {
            kind: "category",
            name: "Controls",
            contents: [],
        },
        {
            kind: "category",
            name: "Empty",
            contents: [],
        },
    ],
};

export type OSLFInstance = {
    workspace: Blockly.Workspace;
    handlers: Array<() => void>;
};

function destroy(instance: OSLFInstance) {
    // Cleanup debounce timer
    if (searchDebounceTimer) {
        clearTimeout(searchDebounceTimer);
        searchDebounceTimer = null;
    }

    instance.handlers.forEach((callback) => callback());
    instance.workspace.dispose();
}

function dispatchChanges(workspace: Blockly.Workspace) {
    const state = Blockly.serialization.workspaces.save(
        workspace as Blockly.WorkspaceSvg,
    );

    // Generate code from workspace using message0 templates
    const code = generateCode(workspace);

    window.dispatchEvent(
        new CustomEvent(Events.ON_CHANGE, {
            detail: { state, code },
            bubbles: true,
            composed: true,
        }),
    );
}

function setupWorkspaceChangeListener(workspace: Blockly.Workspace) {
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    workspace.addChangeListener((event: Blockly.Events.Abstract) => {
        // Ignore UI events, only save on actual workspace changes
        if (event.isUiEvent) return;

        // Debounce to avoid excessive saves
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        debounceTimer = setTimeout(() => {
            dispatchChanges(workspace);
        }, 1000); // Save 1 second after last change
    });
}

function filterBlocksByTooltip(
    blocks: BlockDefinition[],
    searchTerm: string,
): BlockDefinition[] {
    if (!searchTerm || searchTerm.trim() === "") {
        return blocks;
    }

    const normalizedSearch = searchTerm.toLowerCase().trim();

    return blocks.filter((block) => {
        return block.tooltip
            ? block.tooltip.toLowerCase().includes(normalizedSearch)
            : false;
    });
}

function generateToolboxFromBlocks(
    blocks: BlockDefinition[],
    isSearchActive = false,
) {
    const customBlocksToolbox = blocks.map((block) => ({
        kind: "block",
        type: block.type,
    }));

    if (isSearchActive) {
        // When searching, show all results in a single expanded category
        return {
            kind: "categoryToolbox",
            contents: [
                {
                    kind: "category",
                    name: `Search Results (${blocks.length})`,
                    contents: customBlocksToolbox,
                    expanded: "true",
                    colour: "#5C81A6",
                },
            ],
        };
    }

    // Category toolbox - normal mode with categories
    return {
        kind: "categoryToolbox",
        contents: [
            {
                kind: "category",
                name: "Custom blocks",
                contents: customBlocksToolbox,
            },
        ],
    };
}

function updateToolboxWithFilter(
    workspace: Blockly.Workspace,
    searchTerm: string,
) {
    // Guard: blocks not yet loaded
    if (originalBlocks.length === 0) return;

    const filteredBlocks = filterBlocksByTooltip(originalBlocks, searchTerm);
    // Show search results in expanded category when searching
    const isSearchActive = searchTerm.trim() !== "";
    const updatedToolbox = generateToolboxFromBlocks(
        filteredBlocks,
        isSearchActive,
    );

    const workspaceSvg = workspace as Blockly.WorkspaceSvg;
    workspaceSvg.updateToolbox(updatedToolbox);

    // Auto-select first category to show blocks in flyout when searching
    if (isSearchActive) {
        const toolbox = workspaceSvg.getToolbox();
        if (toolbox) {
            // Select the first category (position 0) to open the flyout
            toolbox.selectItemByPosition(0);
        }
    }
}

function loadBlocks(
    workspace: Blockly.Workspace,
    event: CustomEvent<BlockDefinition[]>,
) {
    const blocks = event.detail;
    if (blocks) {
        // Store original blocks for filtering
        originalBlocks = blocks;

        Blockly.defineBlocksWithJsonArray(blocks);

        // Register blocks with the code generator
        registerBlocks(blocks);

        // Use shared toolbox generation function
        const updatedToolbox = generateToolboxFromBlocks(blocks);

        // Update the workspace toolbox
        const workspaceSvg = workspace as Blockly.WorkspaceSvg;
        workspaceSvg.updateToolbox(updatedToolbox);
    }
}

export function init(container: Element): OSLFInstance {
    // Inject fonts (style @import)
    const style = document.createElement("style");
    style.innerText =
        "@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');";
    style.innerText += `
	  .blocklyToolbox,
	  svg.blocklySvg {
			height: 100% !important;
		}
	  .blocklyToolbox{
			padding-top: 0;
			min-width: 230px;
			overflow-y: hidden;
		}
		.blocklyToolboxCategory{
			padding:0;
			margin-bottom:0;
		}
	  .blocklyToolboxCategory.blocklyToolboxSelected{
			background-color: #1E2936 !important;
		}
		.blocklyToolbox, .blocklyFlyout{
			border-right: #2E3F52 1px solid;
		}
		.blocklyToolboxCategoryGroup {
			overflow-y: auto;
			height: 100%;
			flex-wrap: nowrap !important;
		}
		.searchInput{
			background-color: #161E27 !important;
			width: 100%;
			border: none;
			color: white;
			outline: none;
			line-height: 125%;
			padding: 18.5px 24px;
			font-size: 12px;
			box-sizing: border-box;
			position: absolute;
			top: 0;
		}
		.blocklyToolboxCategoryIcon{
			display: none !important;
		}
		.blocklyToolboxCategoryContainer:after{
			display: block;
			content: "";
			width: 100%;
			border-bottom: 1px solid #2E3F52;
		}
		.blocklyToolboxCategoryLabel {
		  display: block;
			font-family: 'Manrope';
			font-size: 16px;
			font-weight: 600;
			font-family: Manrope;
			font-style: SemiBold;
			leading-trim: NONE;
			line-height: 130%;
			letter-spacing: 0px;
			outline: none;
			box-sizing: border-box;
		}
  `;
    document.head.appendChild(style);

    // inject search input
    const searchInput = document.createElement("input-search");
    searchInput.setAttribute("placeholder", "Search blocks...");

    const workspace = initEditor(container, DEFAULT_TOOLBOX);

    container.addEventListener(Events.INIT, (event) => {
        loadBlocks(workspace, event as any);
    });

    setupWorkspaceChangeListener(workspace);

    const handlers = [];

    console.log("Editor initialized");

    const toolbox = document.getElementsByClassName("blocklyToolbox")[0];
    if (toolbox) {
        console.log(toolbox);
        toolbox.prepend(searchInput);
    }

    // Setup search input event listeners
    searchInput.addEventListener("search", (event: Event) => {
        const customEvent = event as CustomEvent<{ value: string }>;
        const searchTerm = customEvent.detail.value;

        // Debounce to avoid excessive updates
        if (searchDebounceTimer) {
            clearTimeout(searchDebounceTimer);
        }

        searchDebounceTimer = setTimeout(() => {
            updateToolboxWithFilter(workspace, searchTerm);
        }, 300);
    });

    searchInput.addEventListener("clear", () => {
        // Clear debounce timer
        if (searchDebounceTimer) {
            clearTimeout(searchDebounceTimer);
        }
        // Immediately restore all blocks
        updateToolboxWithFilter(workspace, "");
    });

    return {
        workspace,
        handlers,
    };
}

// Re-export generator utilities
export { rhoLangGenerator, generateCode, registerBlocks, Order, RhoLangGenerator };

// Re-export gradient utilities
export { applyBlockGradients, removeBlockGradients } from "./gradients";
