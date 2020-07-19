module.exports = function(eleventyConfig) {
    
    const markdownIt = require('markdown-it');
    const markdownItOptions = {
        html: true,
        linkify: true
    };
    
    const mdWikilinksOptions = {
        baseURL: "/",
        makeAllLinksAbsolute: true,
        uriSuffix: "/",
        linkPattern: /\[\[([\w\s/-]+)(\|([\w\s/]+))?\]\]/,
        postProcessPageName: (pageName) => {
            return pageName.trim().toLowerCase().replace(/\s/g, "-");
        }
    }
    
    const md = markdownIt(markdownItOptions)
    .use(require('markdown-it-footnote'))
    .use(require("@kwvanderlinde/markdown-it-wikilinks")(mdWikilinksOptions))
    
    eleventyConfig.setLibrary('md', md);
    
    // eleventyConfig.addPassthroughCopy('assets');

    return {
        useGitIgnore: false,
        dir: {
            input: "./",
            output: "dist",
            layouts: "layouts",
            includes: "includes",
            data: "data"
        },
        passthroughFileCopy: true
    }
}