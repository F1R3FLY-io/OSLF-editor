import { Canvas } from "fabric";
export declare enum Events {
    TREE_REQUEST = "tree:request",
    TREE_RETURN = "tree:return"
}
export declare class EditorElement extends HTMLElement {
    canvas: Canvas;
    width: number;
    height: number;
    disposers: Array<Function>;
    static observedAttributes: string[];
    constructor();
    connectedCallback(): void;
    render(): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
}
export declare function init(): void;
export { init };
//# sourceMappingURL=index.d.ts.map