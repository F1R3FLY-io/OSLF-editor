import * as Blockly from "blockly/core";
import { CustomConstantProvider } from "./CustomConstants";
import { ConstantProvider } from "blockly/core/renderers/common/constants";

export const RENDERER_NAME = "oslf_renderer";

/**
 * Custom renderer for OSLF blocks.
 * Extends the base Blockly renderer with curved connectors from block.svg design.
 */
class CustomRenderer extends Blockly.blockRendering.Renderer {
	protected override makeConstants_(): ConstantProvider {
		return new CustomConstantProvider();
	}
}

Blockly.blockRendering.register(RENDERER_NAME, CustomRenderer);
