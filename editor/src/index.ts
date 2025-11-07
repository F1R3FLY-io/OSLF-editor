import { Canvas, Rect } from "fabric";

export enum Events {
	TREE_REQUEST = "tree:request",
	TREE_RETURN = "tree:return",
}

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 600;

function createEditor(
	el: string | HTMLCanvasElement,
	width: number,
	height: number,
) {
	const canvas = new Canvas(el, { width, height });
	let rect = new Rect({
		left: 50,
		top: 50,
		width: 100,
		height: 100,
		fill: "red",
	});
	canvas.add(rect);
	canvas.centerObject(rect);

	return canvas;
}

class EditorElement extends HTMLElement {
	canvas: Canvas;
	width: null | number = null;
	height: null | number = null;
	handlers: Array<Function> = [];

	static observedAttributes = ["width", "height"];

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		this.render();
	}

	handleListeners() {
		this.handlers.forEach((callback) => callback());

		const listenTreeRequest = () => {
			this.dispatchEvent(
				new CustomEvent(Events.TREE_RETURN, {
					detail: this.canvas.toObject(),
					bubbles: true,
					composed: true,
				}),
			);
		};

		this.addEventListener(Events.TREE_REQUEST, listenTreeRequest);
		this.handlers.push(() => {
			this.removeEventListener(Events.TREE_REQUEST, listenTreeRequest);
			console.log("Callback removed");
		});
	}

	render() {
		if (this.height == null || this.width == null) {
			return;
		} else {
			console.log("rendered");
		}

		this.handleListeners();

		const canvas = document.createElement("canvas");

		this.shadowRoot?.appendChild(canvas);

		this.canvas = createEditor(canvas, this.width, this.height);
	}

	attributeChangedCallback(name, oldValue, newValue) {
		this[name] = newValue;
	}
}

window.customElements.define("oslf-editor", EditorElement);
