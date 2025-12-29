import * as Blockly from "blockly/core";

/**
 * Custom constant provider that defines triangular connectors instead of puzzle-piece notches.
 */
class OslfConstantProvider extends Blockly.zelos.ConstantProvider {
	constructor() {
		super();
	}

	/**
	 * Create a triangular notch shape for horizontal connections (top/bottom of blocks).
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

		// Triangle pointing down (for the notch/indent)
		// Draws: go right-down to center, then right-up to end
		const pathLeft = `l ${width / 2},${height} l ${width / 2},-${height}`;

		// Triangle pointing up (reverse direction)
		const pathRight = `l -${width / 2},${height} l -${width / 2},-${height}`;

		return {
			type: this.SHAPES.NOTCH,
			width: width,
			height: height,
			pathLeft: pathLeft,
			pathRight: pathRight,
		};
	}

	/**
	 * Create a triangular puzzle tab shape for vertical connections (input/output).
	 */
	override makePuzzleTab(): {
		type: number;
		width: number;
		height: number;
		pathDown: (rtl: boolean) => string;
		pathUp: (rtl: boolean) => string;
	} {
		const width = this.TAB_WIDTH;
		const height = this.TAB_HEIGHT;

		// Triangle pointing outward (for the tab/protrusion)
		function pathDown(rtl: boolean): string {
			const dir = rtl ? -1 : 1;
			// Go down half, jut out to form triangle point, then back and down
			return `l 0,${height / 2} l ${dir * -width},${height / 4} l ${dir * width},${height / 4} l 0,${height / 2}`;
		}

		function pathUp(rtl: boolean): string {
			const dir = rtl ? -1 : 1;
			// Reverse of pathDown
			return `l 0,-${height / 2} l ${dir * -width},-${height / 4} l ${dir * width},-${height / 4} l 0,-${height / 2}`;
		}

		return {
			type: this.SHAPES.PUZZLE,
			width: width,
			height: height,
			pathDown: pathDown,
			pathUp: pathUp,
		};
	}
}

/**
 * Custom renderer that uses triangular connectors.
 */
class OslfRenderer extends Blockly.zelos.Renderer {
	constructor(name: string) {
		super(name);
	}

	override makeConstants_(): OslfConstantProvider {
		return new OslfConstantProvider();
	}
}

// Register the custom renderer with Blockly
Blockly.blockRendering.register("oslf_renderer", OslfRenderer);

export { OslfRenderer, OslfConstantProvider };
