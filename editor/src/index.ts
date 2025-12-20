import * as Blockly from "blockly/core";
import { BlockDefinition } from "blockly/core/blocks";
import { initEditor } from "./initEditor";
import "@f1r3fly.io/input-search";

export enum Events {
    INIT = "blockly:init",
    ON_CHANGE = "blockly:on_change",
}

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
    instance.handlers.forEach((callback) => callback());
    instance.workspace.dispose();
}

function dispatchChanges(workspace: Blockly.Workspace) {
    const state = Blockly.serialization.workspaces.save(
        workspace as Blockly.WorkspaceSvg,
    );

    window.dispatchEvent(
        new CustomEvent(Events.ON_CHANGE, {
            detail: { state },
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

function loadBlocks(
    workspace: Blockly.Workspace,
    event: CustomEvent<BlockDefinition[]>,
) {
    const blocks = event.detail;
    if (blocks) {
        Blockly.defineBlocksWithJsonArray(blocks);

        // Generate toolbox contents from the block definitions
        const customBlocksToolbox = blocks.map((block) => ({
            kind: "block",
            type: block.type,
        }));

        // Create toolbox with blocks in the root (flyout toolbox)
        const updatedToolbox = {
            kind: "categoryToolbox",
            contents: [
                {
                    kind: "category",
                    name: "Custom blocks",
                    contents: customBlocksToolbox,
                },
            ],
        };

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
	  .blocklyToolbox{
			padding-top: 52px;
			min-width: 230px;
			height: calc(100% - 58px) !important;
			// height: 100%;
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
    searchInput.placeholder = "Categories";

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

    return {
        workspace,
        handlers,
    };
}
