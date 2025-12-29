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
	 * Create a rounded puzzle tab shape.
	 * This replaces the default Zelos puzzle tab with a smoother curve.
	 */
	private makeRoundedPuzzleTab(): {
		type: number;
		width: number;
		height: number;
		pathDown: string;
		pathUp: string;
	} {
		const width = this.TAB_WIDTH;
		const height = this.TAB_HEIGHT;

		// Smooth rounded puzzle tab using bezier curves
		// Creates a rounded protrusion for value input connections
		const pathDown =
			`v 5 ` +
			`c 0,10 -8,8 -8,7.5 ` +
			`s 8,-2.5 8,7.5 ` +
			`v 5`;

		const pathUp =
			`v -5 ` +
			`c 0,-10 -8,-8 -8,-7.5 ` +
			`s 8,2.5 8,-7.5 ` +
			`v -5`;

		return {
			type: this.SHAPES.PUZZLE,
			width: width,
			height: height,
			pathDown: pathDown,
			pathUp: pathUp,
		};
	}

	/**
	 * Override notch shape for statement connections (top/bottom connectors).
	 */
	override makeNotch(): {
		type: number;
		width: number;
		height: number;
		pathLeft: string;
		pathRight: string;
	} {
		const width = this.NOTCH_WIDTH;
		const height = this.NOTCH_HEIGHT;

		// Rounded notch shape using smooth curves
		const pathLeft =
			`c 2,0 3,1 4,2 ` +
			`l 4,4 ` +
			`c 1,1 2,2 4,2 ` +
			`l 8,0 ` +
			`c 2,0 3,-1 4,-2 ` +
			`l 4,-4 ` +
			`c 1,-1 2,-2 4,-2`;

		const pathRight =
			`c -2,0 -3,1 -4,2 ` +
			`l -4,4 ` +
			`c -1,1 -2,2 -4,2 ` +
			`l -8,0 ` +
			`c -2,0 -3,-1 -4,-2 ` +
			`l -4,-4 ` +
			`c -1,-1 -2,-2 -4,-2`;

		return {
			type: this.SHAPES.NOTCH,
			width: width,
			height: height,
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
