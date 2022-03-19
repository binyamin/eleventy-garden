# Adding pages

## Adding simple top level pages

The template comes with only Home, About Me and Notes pages. Although this structure is nice and simple you might want to add a few more simple static pages. To do this just copy and rename the about.md file and edit it to have the content you want. Usually markdown is used but 11ty supports plain html and more by default.

Assuming you thus creted a new portfolio.md file you should be able to start 11ty, navigate to http://localhost:8080/portfolio/ and review the results. To allow ease of access now just edit the default template (layouts/default.html) and just below <a href="/about">About Me</a> add another entry of <a href="/portfolio">Portfolio</a>.

## Adding a blog

Adding a blog is a bit more involved but nothing too hard - just follow along:

* First add another folder named "blog" right beside the current "notes" folder.
* Add one or more posts - just simple markdown files with content similar to about.md or any of these notes.
* Add a blog.11tydata.js file to the blog folder to be able to set meta-data and behavoiur for all posts at a time. The contents depend on what you want in your blog but a good starting point could be something like this:

```js
const {titleCase} = require("title-case");

module.exports = {
    layout: "default.html",
    type: "blogpost",
    eleventyComputed: {
        title: function(data) {
            const itm = this.getCollectionItem(data.collections.blogpost, {...data.page});
            const content = itm?.template.frontMatter.content;

            function getTitle(content) {
                if(!content) return null;
                const firstLine = content.substring(0, content.indexOf('\n'));
                return firstLine.startsWith("#") ? firstLine.replace(/#\s*/, '').replace(/\r/, '') : null;
            }

            return getTitle(content) || titleCase(data.title || data.page.fileSlug)
        }
    }
}
```

This sets the title to either frontmatter or the first line if it's a typical markdown header.

* Now add an index.njk file with the following content to display all posts with pagination:

```njk
---
layout: default.html
pagination:
  data: collections.blogpost
  size: 10
  alias: blog
---

<ul>
  {%- for post in collections.blogpost | reverse -%}
    <li>
      <h3><a href="{{ post.url | url }}">{{ post.data.title }}</a></h3>
    </li>
  {%- endfor -%}
</ul>
```

* Go and edit the main .eleventy.js. Below the ```eleventyConfig.addCollection...``` section add a similar section but for blogposts like this:
```js
eleventyConfig.addCollection("blogpost", function (collection) {
        return collection.getFilteredByGlob(["blog/**/*.md", "index.njk"]);
    });
```
* Finally add a link to the navigation bar with another <a href="/blog">Blog</a> line in the default.html. Go view it and see if it works!

## Extending the above basic blog

A few easy tweaks can be used to give the blog a more personal style.

* Create a dedicated layout file for the blog. Just add it to layouts folder, call it e.g. blog.html and link it instead of default.html from the blog.11tydata.js. Consider using layout: default like in the note.html to keep the navigation bar on blog pages.
* Create a better front page for your blog by altering index.njk. Again consider changing the layout to another but also consider adding more metadata via either front-matter or the blog.11tydata.js file. This can then be referred in the index.njk like e.g. date or resume:
```
---
layout: blogindex.njk
pagination:
  data: collections.blog
  size: 10
  alias: blog
---

<h1>Check out my most recent posts below:</h1>

<ul>
  {%- for post in collections.blogpost | reverse -%}
    <li>
      <h3>{{ post.date }}: <a href="{{ post.url | url }}">{{ post.data.title }}</a></h3>
      {% if post.data.resume %}
        <p>{{ post.data.resume }}</p>
      {% endif %} 
    </li>
  {%- endfor -%}
</ul>
```

* For even further insight into modding your overall site, look into [[files-of-note|files of note]].
