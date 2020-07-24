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
            let str = titleCase(data.page.fileSlug);
            str = str.replace(/-/g, ' ');
            return str;
        }

        // permalink: data => {
        //     let postPermalink =
        //         "/posts/{{ slug }}/";

        //     if (process.env.ELEVENTY_ENV !== "production") return postPermalink;
        //     else return data.draft ? false : postPermalink;
        // }
    }
};