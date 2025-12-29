import * as Blockly from "blockly/core";

/**
 * Custom constant provider that defines rounded notch shape for block connectors.
 * Extends the Zelos renderer for a modern look with rounded connectors.
 */
class OslfConstantProvider extends Blockly.zelos.ConstantProvider {
	constructor() {
		super();
	}

	/**
	 * Initialize shape objects based on the constants set in the constructor.
	 * Override to customize the puzzle tab (connector) shape.
	 */
	override init(): void {
		super.init();

		// Override puzzle tab with rounded shape
		this.PUZZLE_TAB = this.makeRoundedPuzzleTab();
	}

	/**
	 * Create a rounded rectangle puzzle tab shape.
	 * Small horizontal bump with rounded corners for value input connections.
	 */
	private makeRoundedPuzzleTab(): {
		type: number;
		width: number;
		height: number;
		pathDown: string;
		pathUp: string;
	} {
		// Small rounded rectangle tab dimensions
		const tabWidth = 8;
		const tabHeight = 16;
		const radius = 4;

		// Path going down (right side of block)
		// Creates a small rounded rectangle protruding to the right
		const pathDown =
			`v ${(tabHeight - radius * 2) / 2} ` + // go down to start of tab
			`c 0,${radius} ${radius},${radius} ${tabWidth},${radius} ` + // curve out to tab
			`v ${tabHeight - radius * 2} ` + // straight down along tab
			`c -${tabWidth - radius},0 -${tabWidth},${radius} -${tabWidth},${radius} ` + // curve back
			`v ${(tabHeight - radius * 2) / 2}`; // continue down

		// Path going up (reverse)
		const pathUp =
			`v -${(tabHeight - radius * 2) / 2} ` +
			`c 0,-${radius} ${radius},-${radius} ${tabWidth},-${radius} ` +
			`v -${tabHeight - radius * 2} ` +
			`c -${tabWidth - radius},0 -${tabWidth},-${radius} -${tabWidth},-${radius} ` +
			`v -${(tabHeight - radius * 2) / 2}`;

		return {
			type: this.SHAPES.PUZZLE,
			width: tabWidth,
			height: tabHeight,
			pathDown: pathDown,
			pathUp: pathUp,
		};
	}

	/**
	 * Override notch shape for statement connections (top/bottom connectors).
	 * Creates a smooth curved wave-like indentation.
	 */
	override makeNotch(): {
		type: number;
		width: number;
		height: number;
		pathLeft: string;
		pathRight: string;
	} {
		// Smooth wave notch dimensions
		const notchWidth = 36;
		const notchHeight = 8;

		// Smooth curved notch - wave shape going down then up
		// pathLeft: drawing from left to right (used on top of blocks)
		const pathLeft =
			`c 3,0 6,${notchHeight} 9,${notchHeight} ` + // curve down
			`l ${notchWidth - 18},0 ` + // flat bottom
			`c 3,0 6,-${notchHeight} 9,-${notchHeight}`; // curve up

		// pathRight: drawing from right to left (used on bottom of blocks)
		const pathRight =
			`c -3,0 -6,${notchHeight} -9,${notchHeight} ` +
			`l -${notchWidth - 18},0 ` +
			`c -3,0 -6,-${notchHeight} -9,-${notchHeight}`;

		return {
			type: this.SHAPES.NOTCH,
			width: notchWidth,
			height: notchHeight,
			pathLeft: pathLeft,
			pathRight: pathRight,
		};
	}
}

/**
 * Custom renderer that uses the OSLF constant provider.
 * Based on Zelos renderer for modern block appearance.
 */
class OslfRenderer extends Blockly.zelos.Renderer {
	constructor(name: string) {
		super(name);
	}

	/**
	 * Create a new instance of the OSLF constant provider.
	 */
	protected override makeConstants_(): OslfConstantProvider {
		return new OslfConstantProvider();
	}
}

// Register the custom renderer with Blockly
Blockly.blockRendering.register("oslf_renderer", OslfRenderer);

export { OslfRenderer, OslfConstantProvider };
