const {titleCase} = require("title-case");
const path = require("path");

module.exports = {
    layout: "default",
    tags: ["posts"],
    eleventyComputed: {
        
        title: data => {
            if(data.title){
                return data.title;
            }
            let title = data.page.fileSlug.replace(/-/g, ' ');
            title = titleCase(title);
            return title;
        },

    }
};