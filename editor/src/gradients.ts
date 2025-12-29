import type * as Blockly from "blockly/core";

/**
 * Gradient configuration for block styling.
 * Each gradient has a light color (top) and dark color (bottom).
 */
interface GradientConfig {
	id: string;
	lightColor: string;
	darkColor: string;
}

/**
 * Generate gradient definitions based on block colors.
 * Creates a vertical gradient from light (top) to dark (bottom).
 */
function createGradientConfigs(): GradientConfig[] {
	return [
		// Yellow/Gold - for contract, send/receive blocks
		{ id: "gradient-yellow", lightColor: "#ffe066", darkColor: "#c9a227" },
		// Blue - for control, process blocks
		{ id: "gradient-blue", lightColor: "#66b3ff", darkColor: "#1a5c99" },
		// Purple/Violet - for name, logical blocks
		{ id: "gradient-purple", lightColor: "#b366ff", darkColor: "#5c2d91" },
		// Green - for ground, comparison blocks
		{ id: "gradient-green", lightColor: "#66e066", darkColor: "#2d8f2d" },
		// Pink/Magenta - for collection, composition blocks
		{ id: "gradient-pink", lightColor: "#ff66a3", darkColor: "#99264d" },
		// Orange - for receipt, arithmetic blocks
		{ id: "gradient-orange", lightColor: "#ffb366", darkColor: "#995c1a" },
		// Cyan - for declaration blocks
		{ id: "gradient-cyan", lightColor: "#66e6e6", darkColor: "#1a9999" },
		// Yellow-green - for method blocks
		{ id: "gradient-lime", lightColor: "#d4e866", darkColor: "#8fa61a" },
	];
}

/**
 * Creates SVG gradient definitions element.
 */
function createGradientDefs(): SVGDefsElement {
	const svgNS = "http://www.w3.org/2000/svg";
	const defs = document.createElementNS(svgNS, "defs");

	const gradients = createGradientConfigs();

	for (const gradient of gradients) {
		const linearGradient = document.createElementNS(svgNS, "linearGradient");
		linearGradient.setAttribute("id", gradient.id);
		linearGradient.setAttribute("x1", "0%");
		linearGradient.setAttribute("y1", "0%");
		linearGradient.setAttribute("x2", "0%");
		linearGradient.setAttribute("y2", "100%");

		const stop1 = document.createElementNS(svgNS, "stop");
		stop1.setAttribute("offset", "0%");
		stop1.setAttribute("stop-color", gradient.lightColor);

		const stop2 = document.createElementNS(svgNS, "stop");
		stop2.setAttribute("offset", "100%");
		stop2.setAttribute("stop-color", gradient.darkColor);

		linearGradient.appendChild(stop1);
		linearGradient.appendChild(stop2);
		defs.appendChild(linearGradient);
	}

	return defs;
}

/**
 * CSS styles to apply gradients to blocks based on their fill color.
 * Maps block colors to gradient IDs.
 */
function createGradientStyles(): string {
	return `
		/* Yellow/Gold blocks */
		.blocklyPath[fill="#ffcc00"],
		.blocklyPath[fill="#ffab19"],
		.blocklyPath[fill="#d9ad00"],
		.blocklyPath[fill="#d98f15"] {
			fill: url(#gradient-yellow) !important;
		}

		/* Blue blocks */
		.blocklyPath[fill="#208bfe"],
		.blocklyPath[fill="#4d97ff"],
		.blocklyPath[fill="#1a73d8"],
		.blocklyPath[fill="#3d7fd9"],
		.blocklyPath[fill="#4ea3ff"] {
			fill: url(#gradient-blue) !important;
		}

		/* Purple/Violet blocks */
		.blocklyPath[fill="#9966ff"],
		.blocklyPath[fill="#a366ff"],
		.blocklyPath[fill="#7f52d9"],
		.blocklyPath[fill="#8852d9"],
		.blocklyPath[fill="#65cda8"] {
			fill: url(#gradient-purple) !important;
		}

		/* Green blocks */
		.blocklyPath[fill="#5cb85c"],
		.blocklyPath[fill="#40bf86"],
		.blocklyPath[fill="#4a9d4a"],
		.blocklyPath[fill="#359f6f"] {
			fill: url(#gradient-green) !important;
		}

		/* Pink/Magenta blocks */
		.blocklyPath[fill="#ff6680"],
		.blocklyPath[fill="#ff4da6"],
		.blocklyPath[fill="#d94f6b"],
		.blocklyPath[fill="#d93f8a"] {
			fill: url(#gradient-pink) !important;
		}

		/* Orange blocks */
		.blocklyPath[fill="#ff6b35"],
		.blocklyPath[fill="#d9592c"] {
			fill: url(#gradient-orange) !important;
		}

		/* Cyan blocks */
		.blocklyPath[fill="#00c9c9"],
		.blocklyPath[fill="#00a7a7"] {
			fill: url(#gradient-cyan) !important;
		}

		/* Lime/Yellow-green blocks */
		.blocklyPath[fill="#c4d91f"],
		.blocklyPath[fill="#a3b619"] {
			fill: url(#gradient-lime) !important;
		}
	`;
}

/**
 * Injects gradient definitions and styles into a Blockly workspace.
 * Should be called after workspace initialization.
 *
 * @param workspace - The Blockly workspace to apply gradients to
 */
export function applyBlockGradients(workspace: Blockly.WorkspaceSvg): void {
	const svg = workspace.getParentSvg();
	if (!svg) {
		console.warn("Could not find workspace SVG for gradient injection");
		return;
	}

	// Check if gradients are already injected
	if (svg.querySelector("defs linearGradient")) {
		return;
	}

	// Add gradient definitions to SVG
	const defs = createGradientDefs();
	svg.insertBefore(defs, svg.firstChild);

	// Add CSS styles
	const styleId = "blockly-gradient-styles";
	if (!document.getElementById(styleId)) {
		const style = document.createElement("style");
		style.id = styleId;
		style.textContent = createGradientStyles();
		document.head.appendChild(style);
	}
}

/**
 * Removes gradient styles from the document.
 */
export function removeBlockGradients(): void {
	const style = document.getElementById("blockly-gradient-styles");
	if (style) {
		style.remove();
	}
}
