import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
	site: 'https://efrainsiccha.github.io',
	base: '/portfolio-dev/',
	integrations: [tailwind()],
});
