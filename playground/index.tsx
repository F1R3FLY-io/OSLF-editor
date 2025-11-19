import { createRoot } from "react-dom/client";
import { useRef, useState, useEffect } from "react";
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
	const ref = useRef<HTMLElement>(null);
	const [generatedCode, setGeneratedCode] = useState<string>("");

	useEffect(() => {
		const editor = ref.current;
		if (!editor) return;

		const handleTreeReturn = (event: CustomEvent) => {
			setGeneratedCode(event.detail);
		};

		editor.addEventListener("tree:return", handleTreeReturn);

		return () => {
			editor.removeEventListener("tree:return", handleTreeReturn);
		};
	}, []);

	const handleGenerateCode = () => {
		if (ref.current) {
			ref.current.dispatchEvent(new CustomEvent("tree:request"));
		}
	};

	return (
		<div>
			<div style={{ marginBottom: "10px" }}>
				<button onClick={handleGenerateCode}>Generate Code</button>
			</div>
			<oslf-editor ref={ref}></oslf-editor>
			{generatedCode && (
				<div style={{ marginTop: "10px" }}>
					<h3>Generated Code:</h3>
					<pre
						style={{
							backgroundColor: "#f4f4f4",
							padding: "10px",
							borderRadius: "4px",
							overflow: "auto",
						}}
					>
						{generatedCode}
					</pre>
				</div>
			)}
		</div>
	);
}
