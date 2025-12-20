import { test, expect, beforeEach, afterEach, describe } from "@rstest/core";
import "./index";

describe("SearchInput", () => {
	let container: HTMLDivElement;
	let searchInput: HTMLElement;

	beforeEach(() => {
		container = document.createElement("div");
		document.body.appendChild(container);
		searchInput = document.createElement("search-input") as HTMLElement;
		container.appendChild(searchInput);
	});

	afterEach(() => {
		container.remove();
	});

	describe("Rendering", () => {
		test("should render with shadow DOM", () => {
			expect(searchInput.shadowRoot).not.toBeNull();
		});

		test("should render input element", () => {
			const input = searchInput.shadowRoot?.querySelector("input");
			expect(input).not.toBeNull();
		});

		test("should render search icon by default", () => {
			const searchIcon = searchInput.shadowRoot?.querySelector(
				'[data-icon="search"]',
			);
			expect(searchIcon).not.toBeNull();
			expect(searchIcon?.classList.contains("hidden")).toBe(false);
		});

		test("should render clear button hidden by default", () => {
			const clearButton = searchInput.shadowRoot?.querySelector(
				'[data-icon="clear"]',
			);
			expect(clearButton).not.toBeNull();
			expect(clearButton?.classList.contains("hidden")).toBe(true);
		});

		test("should render with default placeholder", () => {
			const input = searchInput.shadowRoot?.querySelector("input");
			expect(input?.placeholder).toBe("Categories");
		});
	});

	describe("Placeholder attribute", () => {
		test.each([
			["Search...", "Search..."],
			["Custom", "Custom"],
			["Find items", "Find items"],
		])(
			"should accept custom placeholder: %s",
			async (placeholder, expected) => {
				searchInput.setAttribute("placeholder", placeholder);
				await new Promise((resolve) => setTimeout(resolve, 0));

				const input = searchInput.shadowRoot?.querySelector("input");
				expect(input?.placeholder).toBe(expected);
			},
		);

		test("should update placeholder when attribute changes", async () => {
			const input = searchInput.shadowRoot?.querySelector("input");
			searchInput.setAttribute("placeholder", "New placeholder");

			await new Promise((resolve) => setTimeout(resolve, 0));

			expect(input?.placeholder).toBe("New placeholder");
		});

		test("should have placeholder property getter", () => {
			expect((searchInput as any).placeholder).toBe("Categories");
		});

		test("should have placeholder property setter", () => {
			(searchInput as any).placeholder = "Custom";
			expect(searchInput.getAttribute("placeholder")).toBe("Custom");
		});
	});

	describe("Icon state toggling", () => {
		test.each([
			["test", true, false],
			["hello world", true, false],
			["123", true, false],
		])(
			"should show clear button when input has value: %s",
			(value, searchHidden, clearHidden) => {
				const input = searchInput.shadowRoot?.querySelector(
					"input",
				) as HTMLInputElement;
				const searchIcon = searchInput.shadowRoot?.querySelector(
					'[data-icon="search"]',
				);
				const clearButton = searchInput.shadowRoot?.querySelector(
					'[data-icon="clear"]',
				);

				input.value = value;
				input.dispatchEvent(new Event("input"));

				expect(searchIcon?.classList.contains("hidden")).toBe(searchHidden);
				expect(clearButton?.classList.contains("hidden")).toBe(clearHidden);
			},
		);

		test("should show search icon when input is empty", () => {
			const input = searchInput.shadowRoot?.querySelector(
				"input",
			) as HTMLInputElement;
			const searchIcon = searchInput.shadowRoot?.querySelector(
				'[data-icon="search"]',
			);
			const clearButton = searchInput.shadowRoot?.querySelector(
				'[data-icon="clear"]',
			);

			input.value = "test";
			input.dispatchEvent(new Event("input"));
			input.value = "";
			input.dispatchEvent(new Event("input"));

			expect(searchIcon?.classList.contains("hidden")).toBe(false);
			expect(clearButton?.classList.contains("hidden")).toBe(true);
		});
	});

	describe("Background state", () => {
		test("should add has-value class when input has value", () => {
			const input = searchInput.shadowRoot?.querySelector(
				"input",
			) as HTMLInputElement;
			const containerEl = searchInput.shadowRoot?.querySelector(
				".search-container",
			);

			input.value = "test";
			input.dispatchEvent(new Event("input"));

			expect(containerEl?.classList.contains("has-value")).toBe(true);
		});

		test("should remove has-value class when input is empty", () => {
			const input = searchInput.shadowRoot?.querySelector(
				"input",
			) as HTMLInputElement;
			const containerEl = searchInput.shadowRoot?.querySelector(
				".search-container",
			);

			input.value = "test";
			input.dispatchEvent(new Event("input"));
			input.value = "";
			input.dispatchEvent(new Event("input"));

			expect(containerEl?.classList.contains("has-value")).toBe(false);
		});
	});

	describe("Clear button functionality", () => {
		test("should clear input when clear button is clicked", () => {
			const input = searchInput.shadowRoot?.querySelector(
				"input",
			) as HTMLInputElement;
			const clearButton = searchInput.shadowRoot?.querySelector(
				'[data-icon="clear"]',
			) as HTMLButtonElement;

			input.value = "test";
			input.dispatchEvent(new Event("input"));
			clearButton.click();

			expect(input.value).toBe("");
		});

		test("should emit clear event when clear button is clicked", () => {
			const input = searchInput.shadowRoot?.querySelector(
				"input",
			) as HTMLInputElement;
			const clearButton = searchInput.shadowRoot?.querySelector(
				'[data-icon="clear"]',
			) as HTMLButtonElement;

			let clearEventFired = false;
			searchInput.addEventListener("clear", () => {
				clearEventFired = true;
			});

			input.value = "test";
			input.dispatchEvent(new Event("input"));
			clearButton.click();

			expect(clearEventFired).toBe(true);
		});

		test("should hide clear button after clearing", () => {
			const input = searchInput.shadowRoot?.querySelector(
				"input",
			) as HTMLInputElement;
			const clearButton = searchInput.shadowRoot?.querySelector(
				'[data-icon="clear"]',
			) as HTMLButtonElement;
			const searchIcon = searchInput.shadowRoot?.querySelector(
				'[data-icon="search"]',
			);

			input.value = "test";
			input.dispatchEvent(new Event("input"));
			clearButton.click();

			expect(clearButton.classList.contains("hidden")).toBe(true);
			expect(searchIcon?.classList.contains("hidden")).toBe(false);
		});
	});

	describe("Search event", () => {
		test("should emit search event on input", () => {
			const input = searchInput.shadowRoot?.querySelector(
				"input",
			) as HTMLInputElement;

			let searchEventFired = false;
			searchInput.addEventListener("search", () => {
				searchEventFired = true;
			});

			input.value = "test";
			input.dispatchEvent(new Event("input"));

			expect(searchEventFired).toBe(true);
		});

		test.each([
			["test query", "test query"],
			["hello", "hello"],
			["search term", "search term"],
		])(
			"should include input value in search event detail: %s",
			(inputValue, expectedValue) => {
				const input = searchInput.shadowRoot?.querySelector(
					"input",
				) as HTMLInputElement;
				let eventDetail: any;

				searchInput.addEventListener("search", (e: Event) => {
					eventDetail = (e as CustomEvent).detail;
				});

				input.value = inputValue;
				input.dispatchEvent(new Event("input"));

				expect(eventDetail.value).toBe(expectedValue);
			},
		);
	});

	describe("Styling", () => {
		test("should have proper container structure", () => {
			const containerEl = searchInput.shadowRoot?.querySelector(
				".search-container",
			);
			expect(containerEl).not.toBeNull();
			expect(containerEl?.classList.contains("search-container")).toBe(true);
		});

		test("should apply styles via stylesheet", () => {
			const styleEl = searchInput.shadowRoot?.querySelector("style");
			expect(styleEl).not.toBeNull();
			expect(styleEl?.textContent).toContain(".search-container");
			expect(styleEl?.textContent).toContain("height: 42px");
		});

		test("should have transparent background in stylesheet", () => {
			const styleEl = searchInput.shadowRoot?.querySelector("style");
			expect(styleEl?.textContent).toContain("background-color: transparent");
		});
	});

	describe("Accessibility", () => {
		test("should have input type text", () => {
			const input = searchInput.shadowRoot?.querySelector("input");
			expect(input?.type).toBe("text");
		});

		test("should have button type for clear button", () => {
			const clearButton = searchInput.shadowRoot?.querySelector(
				'[data-icon="clear"]',
			) as HTMLButtonElement;
			expect(clearButton.type).toBe("button");
		});

		test("should have button type for search icon", () => {
			const searchIcon = searchInput.shadowRoot?.querySelector(
				'[data-icon="search"]',
			) as HTMLButtonElement;
			expect(searchIcon.type).toBe("button");
		});
	});

	describe("Edge cases", () => {
		test("should handle attributeChangedCallback before input is initialized", () => {
			const newElement = document.createElement(
				"search-input",
			) as HTMLElement;
			// Don't append to DOM yet, so input is not initialized
			(newElement as any).attributeChangedCallback(
				"placeholder",
				"",
				"New Value",
			);
			// Should not throw error
			expect(newElement).toBeTruthy();
		});

		test("should handle updateIconState with null elements", () => {
			const element = searchInput as any;
			const originalInput = element.input;
			element.input = null;
			// Should not throw when input is null
			element.updateIconState();
			element.input = originalInput;
			expect(element.input).toBeTruthy();
		});

		test("should handle empty placeholder attribute", () => {
			searchInput.setAttribute("placeholder", "");
			const input = searchInput.shadowRoot?.querySelector("input");
			// Should fallback to default
			expect(input?.placeholder).toBe("Categories");
		});

		test("should handle null placeholder in attributeChangedCallback", () => {
			const input = searchInput.shadowRoot?.querySelector(
				"input",
			) as HTMLInputElement;
			searchInput.setAttribute("placeholder", "Test");
			expect(input.placeholder).toBe("Test");
			// Setting to empty string should use default
			searchInput.setAttribute("placeholder", "");
			expect(input.placeholder).toBe("Categories");
		});

		test("should handle shadowRoot before render", () => {
			const newElement = document.createElement(
				"search-input",
			) as HTMLElement;
			// setupEventListeners should handle null shadowRoot
			(newElement as any).setupEventListeners();
			expect(newElement).toBeTruthy();
		});

		test("should handle missing container element", () => {
			const element = searchInput as any;
			const originalContainer = element.container;
			element.container = null;
			// Should return early without error
			element.updateIconState();
			element.container = originalContainer;
			expect(element.container).toBeTruthy();
		});
	});
});
