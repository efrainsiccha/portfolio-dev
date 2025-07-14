import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	site: "https://efrainsiccha.github.io",
	base: "/portfolio-dev/",
	integrations: [tailwind()],
});
