const {titleCase} = require("title-case");

// This regex finds all wikilinks in a string
const wikilinkRegExp = /\[\[([\w\s/-]+)(.\w+)?\s?(\|\s?([\w\s/]+))?\]\]/g

function removeFrontmatter(content="") {
    content = content.trimStart();
    let yamlFm = content.substring(3, content.indexOf("---", 3)).trim();

    if(!yamlFm || !content.startsWith("---")) return content; // Content has no frontmatter

    return content.replace(`---\n${yamlFm}\n---`, "");
}

module.exports = {
    layout: "note.html",
    type: "note",
    eleventyComputed: {
        title: data => titleCase(data.title || data.page.fileSlug),
        backlinks: (data) => {
            const notes = data.collections.notes;
            const currentFileSlug = data.page.fileSlug;

            let backlinks = [];

            // Search the other notes for backlinks
            for(const otherNote of notes) {
                const noteContent = removeFrontmatter(otherNote.template.inputContent);
                
                // Get all links from otherNote
                const outboundLinks = (noteContent.match(wikilinkRegExp) || [])
                    .map(link => (
                        // Extract link location
                        link.slice(2,-2)
                            .split("|")[0]
                            .toLowerCase()
                            .replace(/[^\w\s/-]+/g,'')
                            .replace(/.(md|markdown)\s?$/i, "")
                    ));

                // If the other note links here, return related info
                if(outboundLinks.includes(currentFileSlug)) {

                    // Construct preview for hovercards
                    let preview = noteContent.slice(0, 200);
                    preview = preview.slice(0, preview.lastIndexOf(".") +1);

                    backlinks.push({
                        url: otherNote.url,
                        title: otherNote.data.title,
                        preview
                    })
                }
            }

            return backlinks;
        }
    }
}