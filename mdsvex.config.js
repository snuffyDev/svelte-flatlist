import shiki from 'shiki'
import { escapeSvelte } from "mdsvex";

const config = {
	extensions: ['.svelte.md', '.md', '.svx'],

	smartypants: {
		dashes: 'oldschool'
	},
	highlight: {
		highlighter: async (code, lang = "svelte") => {
			const highlighter = await shiki.getHighlighter({ theme: 'github-dark-dimmed' });
			const highlightedCode = escapeSvelte(highlighter.codeToHtml(code, lang));
			return `{@html \`${highlightedCode}\` }`;
		},
	},
	remarkPlugins: [],
	rehypePlugins: []
};

export default config;
