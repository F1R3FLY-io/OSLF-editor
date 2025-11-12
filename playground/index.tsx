import { createRoot } from "react-dom/client";
import { useRef } from "react";
import "f1r3fly-io-oslf-editor";

// Render your React component instead
const root = createRoot(document.getElementById("app"));
root.render(<App />);

declare namespace JSX {
	interface IntrinsicElements {
		[elemName: string]: any;
	}
}

function App() {
	const ref = useRef(null);

	return <oslf-editor ref={ref}></oslf-editor>;
}
