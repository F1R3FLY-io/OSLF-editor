import * as Blockly from "blockly/core";
import {
	JaggedTeeth,
	Notch,
	Shape,
} from "blockly/core/renderers/common/constants";

/** Notch dimensions for triangular connectors */
const NOTCH_WIDTH = 8;
const NOTCH_HEIGHT = 4;

/**
 * Custom constant provider for OSLF blocks with triangular connectors.
 */
export class CustomConstantProvider
	extends Blockly.blockRendering.ConstantProvider
{
	CORNER_RADIUS = 4;
	// protected override makeJaggedTeeth(): Blockly.blockRendering.JaggedTeeth {
	// 	return {} as unknown as JaggedTeeth;
	// }
}
