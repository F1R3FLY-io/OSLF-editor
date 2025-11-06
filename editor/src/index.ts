import { Canvas, Rect } from "fabric";

export enum Events {
	TREE_REQUEST = "tree:request",
	TREE_RETURN = "tree:return",
}

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
	width: number = null;
	height: number = null;
	disposers: Array<Function> = [];

	static observedAttributes = ["width", "height"];

	constructor() {
		super();

		this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.width == null || this.height == null) {
			return;
		} else {
			console.log("rendered");
		}

		this.disposers.forEach((callback) => callback());

		const canvas = document.createElement("canvas");
		const width = parseInt(this.getAttribute("width"));
		const height = parseInt(this.getAttribute("height"));

		this.shadowRoot?.appendChild(canvas);

		this.canvas = createEditor(canvas, width, height);

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
		this.disposers.push(() => {
			this.removeEventListener(Events.TREE_REQUEST, listenTreeRequest);
			console.log("Callback removed");
		});
	}

	attributeChangedCallback(name, oldValue, newValue) {
		this[name] = newValue;
	}
}

window.customElements.define("oslf-editor", EditorElement);
