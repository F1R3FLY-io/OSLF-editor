import { createRoot } from "react-dom/client";
import { useState, useRef, useEffect } from "react";
import "f1r3fly-io-oslf-editor";

// Render your React component instead
const root = createRoot(document.getElementById("app"));
root.render(<App />);

function App() {
	const [structure, setStructure] = useState("");
	const ref = useRef(null);

	function sendRequest() {
		ref.current?.dispatchEvent(new Event("tree:request"));
	}

	function updateStructure(event: CustomEvent) {
		setStructure(() => JSON.stringify(event.detail, null, 2));
	}

	useEffect(() => {
		window.addEventListener("tree:return", updateStructure);

		return () => {
			window.removeEventListener("tree:return", updateStructure);
		};
	}, []);

	return (
		<div>
			<h1>OSLF Editor</h1>
			<button onClick={sendRequest}>Get Structure</button>
			<pre>{structure}</pre>
			<oslf-editor ref={ref} width="800" height="800"></oslf-editor>
		</div>
	);
}
