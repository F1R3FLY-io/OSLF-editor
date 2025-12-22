import { defineConfig } from "@rsbuild/core";

// Docs: https://rsbuild.rs/config/
export default defineConfig({
    html: {
        template: "./src/playground.template.html",
    },
});
