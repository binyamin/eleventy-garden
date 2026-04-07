import { titleCase } from 'title-case';

export default {
	layout: 'note.html',
	type: 'note',
	eleventyComputed: {
		title: data => titleCase(data.title || data.page.fileSlug),
		preview: (data) => {
			const noteContent = data.page.rawInput;

			return data.preview || noteContent.slice(0, 240);
		},
	},
};
