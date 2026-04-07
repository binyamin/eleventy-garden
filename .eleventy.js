import markdownIt from 'markdown-it';
import mdAttrs from 'markdown-it-attrs';
import mdFootnote from 'markdown-it-footnote';

import backlinksPlugin from 'eleventy-plugin-backlinks';

export default function(eleventyConfig) {
	const markdownItOptions = {
		html: true,
		linkify: true,
	};

	const md = markdownIt(markdownItOptions)
		.use(mdFootnote)
		.use(mdAttrs)
		.use(function(md) {
			// Recognize Mediawiki links ([[text]])
			md.linkify.add('[[', {
				validate: /^\s?([^\[\]\|\n\r]+)(\|[^\[\]\|\n\r]+)?\s?\]\]/,
				normalize: match => {
					const parts = match.raw.slice(2, -2).split('|');
					parts[0] = parts[0].replace(/.(md|markdown)\s?$/i, '');
					match.text = (parts[1] || parts[0]).trim();
					match.url = `/notes/${parts[0].trim()}/`;
				},
			});
		});

	eleventyConfig.addFilter('markdownify', string => {
		return md.render(string);
	});

	eleventyConfig.setLibrary('md', md);

	eleventyConfig.addPlugin(backlinksPlugin, {
		getData: (note) => ({
			url: note.url,
			title: note.data.title,
			preview: note.data.preview,
		}),
	});

	eleventyConfig.addPassthroughCopy('src/assets');
	eleventyConfig.setUseGitIgnore(false);

	return {
		dir: {
			input: 'src',
			output: '_site',
			layouts: 'layouts',
			includes: 'includes',
			data: '_data',
		},
		passthroughFileCopy: true,
	};
}
