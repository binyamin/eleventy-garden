# Files of note

Below is some info on some individual files and how they work together to determine the workings of eleventy-garden.

## .eleventyignore

Anything in the `.eleventyignore` file is not seen by eleventy when building the site. On top of `.eleventyignore` node_modules is also ignored and so it the output directory and anything in the .gitignore file (under current eleventy settings).

## package.json (and package-lock.json)

package.json specifies direct dependencies for the project. Updating versions or adding dependencies can be done by modifying the file and then invoking:

````shell
npm prune
npm install
````

from the terminal.

Note also how terminal shortcuts can be specified as is the case with:

````json
"start": "eleventy --serve --quiet"
````

which lets the command `npm start` in the terminal run `eleventy --serve --quiet` under the hood.

`package-lock.json` manifests all underlying dependencies - best practice is to keep it in source control.

## .eleventy.js

Configures how eleventy builds and serves the site. Specifies directory mapping, template formats, collections, passthrough and everything else configurable in eleventy.

## Files in /layouts and /includes

* `/layouts/default.html` is the default layout for every piece of content in eleventy-garden. It lets you handle stuff like the navigation bar in just one place and then use it everywhere.
* `/layouts/note.html` is the specific layout for notes. It references the default layout so the navigation bar is intact.
* `/includes/head.html` holds metadata for each page. Here you can handle title of the page, linked css and even stuff like google analytics. Referenced from `default.html` so shown on every page
* `/includes/backlinks.html` configures how backlinks are handled for note pages.

## /notes/notes.11tydata.js

When a filename matches the directory and has the `.11tydata.js` extension 11ty sees it as a Directory Data File and all files in the directory will have it available. See more at [11ty docs](https://www.11ty.dev/docs/data-template-dir/). So in practice this defines the layout and the title of each note in the notes folder and also generates backlinks for each of them.
