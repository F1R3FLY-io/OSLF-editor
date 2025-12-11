import * as Blockly from "blockly/core";

// Color palette for the OSLF Editor theme
const Colors = {
	// Primary colors
	primary: "#208bfe",
	primaryLight: "#4ea3ff",
	primaryDark: "#0066cc",

	// Block category colors (HSV values)
	ground: 160, // Green tint
	names: 280, // Purple
	collections: 320, // Pink
	receipts: 40, // Orange
	control: 208, // Blue
	declarations: 180, // Cyan
	processes: 208, // Blue
	logical: 260, // Violet
	arithmetic: 20, // Red-orange
	comparison: 140, // Green-blue
	methods: 100, // Yellow-green
	sendReceive: 60, // Yellow
	composition: 340, // Magenta

	// UI colors
	workspace: "#161E27",
	toolbox: "#161E27",
	flyout: "#161E27",
	scrollbar: "#cccccc",
	scrollbarOpacity: 0.4,
	insertionMarker: "#000000",
	insertionMarkerOpacity: 0.2,

	// Text colors
	text: "#000000",
	textSecondary: "#ffffff",
};

// Define block styles for different categories
export const blockStyles = {
	ground_blocks: {
		colourPrimary: "#5cb85c",
		colourSecondary: "#4a9d4a",
		colourTertiary: "#3d8b3d",
	},
	name_blocks: {
		colourPrimary: "#9966ff",
		colourSecondary: "#7f52d9",
		colourTertiary: "#6640b3",
	},
	collection_blocks: {
		colourPrimary: "#ff6680",
		colourSecondary: "#d94f6b",
		colourTertiary: "#b34256",
	},
	receipt_blocks: {
		colourPrimary: "#ffab19",
		colourSecondary: "#d98f15",
		colourTertiary: "#b37612",
	},
	control_blocks: {
		colourPrimary: "#208bfe",
		colourSecondary: "#1a73d8",
		colourTertiary: "#155db3",
	},
	declaration_blocks: {
		colourPrimary: "#00c9c9",
		colourSecondary: "#00a7a7",
		colourTertiary: "#008686",
	},
	process_blocks: {
		colourPrimary: "#4d97ff",
		colourSecondary: "#3d7fd9",
		colourTertiary: "#3268b3",
	},
	logical_blocks: {
		colourPrimary: "#a366ff",
		colourSecondary: "#8852d9",
		colourTertiary: "#6f42b3",
	},
	arithmetic_blocks: {
		colourPrimary: "#ff6b35",
		colourSecondary: "#d9592c",
		colourTertiary: "#b34924",
	},
	comparison_blocks: {
		colourPrimary: "#40bf86",
		colourSecondary: "#359f6f",
		colourTertiary: "#2c8259",
	},
	method_blocks: {
		colourPrimary: "#c4d91f",
		colourSecondary: "#a3b619",
		colourTertiary: "#859414",
	},
	send_receive_blocks: {
		colourPrimary: "#ffcc00",
		colourSecondary: "#d9ad00",
		colourTertiary: "#b38f00",
	},
	composition_blocks: {
		colourPrimary: "#ff4da6",
		colourSecondary: "#d93f8a",
		colourTertiary: "#b33371",
	},
};

// Define category styles for the toolbox
export const categoryStyles = {
	ground_category: {
		colour: "#5cb85c",
	},
	names_category: {
		colour: "#9966ff",
	},
	collections_category: {
		colour: "#ff6680",
	},
	receipts_category: {
		colour: "#ffab19",
	},
	control_category: {
		colour: "#208bfe",
	},
	declarations_category: {
		colour: "#00c9c9",
	},
	processes_category: {
		colour: "#4d97ff",
	},
	logical_category: {
		colour: "#a366ff",
	},
	arithmetic_category: {
		colour: "#ff6b35",
	},
	comparison_category: {
		colour: "#40bf86",
	},
	methods_category: {
		colour: "#c4d91f",
	},
	send_receive_category: {
		colour: "#ffcc00",
	},
	composition_category: {
		colour: "#ff4da6",
	},
};

// Component styles for workspace, toolbox, etc.
export const componentStyles = {
	workspaceBackgroundColour: Colors.workspace,
	toolboxBackgroundColour: Colors.toolbox,
	toolboxForegroundColour: Colors.textSecondary,
	flyoutBackgroundColour: Colors.flyout,
	flyoutForegroundColour: Colors.text,
	flyoutOpacity: 0.95,
	scrollbarColour: Colors.scrollbar,
	scrollbarOpacity: Colors.scrollbarOpacity,
	insertionMarkerColour: Colors.insertionMarker,
	insertionMarkerOpacity: Colors.insertionMarkerOpacity,

	// Cursor and marker colors for keyboard navigation
	cursorColour: "#cc0000",
	markerColour: "#4d97ff",
};

// Font style for the theme
export const fontStyle = {
	family: "'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace",
	weight: "normal",
	size: 12,
};

// Create and export the custom theme
export const OslfTheme = Blockly.Theme.defineTheme("oslf_theme", {
	name: "OSLF Editor Theme",
	blockStyles: blockStyles,
	categoryStyles: categoryStyles,
	componentStyles: componentStyles,
	fontStyle: fontStyle,
	startHats: false, // Enable hat blocks for top-level blocks
});

export default OslfTheme;
