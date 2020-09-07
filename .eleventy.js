module.exports = function(eleventyConfig) {
    
    const markdownIt = require('markdown-it');
    const markdownItOptions = {
        html: true,
        linkify: true
    };
    
    const mdWikilinksOptions = {
        baseURL: "/notes/",
        makeAllLinksAbsolute: true,
        uriSuffix: "/",
        linkPattern: /\[\[([\w\s/-]+)(.\w+)?(\|([\w\s/]+))?\]\]/,
        postProcessPageName: (pageName) => {
            return pageName.trim().toLowerCase();
        }
    }
    
    const md = markdownIt(markdownItOptions)
    .use(require('markdown-it-footnote'))
    .use(require('markdown-it-attrs'))
    .use(require("@kwvanderlinde/markdown-it-wikilinks")(mdWikilinksOptions))
    
    eleventyConfig.addFilter("markdownify", string => {
        return md.render(string)
    })

    eleventyConfig.setLibrary('md', md);
    
    eleventyConfig.addCollection("notes", function (collection) {
        return collection.getFilteredByGlob(["notes/**/*.md", "index.md"]);
    });
    
    eleventyConfig.addPassthroughCopy('assets');

    return {
        useGitIgnore: false,
        dir: {
            input: "./",
            output: "_site",
            layouts: "layouts",
            includes: "includes",
            data: "_data"
        },
        passthroughFileCopy: true
    }
}