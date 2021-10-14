---
title: Syncing your Template
---

# Syncing your template
If you need to update your version of eleventy-garden, run the following git commands

```shell
# Set up reference to original template (first time only)
$ git remote add upstream https://github.com/binyamin/eleventy-garden.git
$ git fetch upstream

# Save any uncommited changes
$ git stash

# Update repository
$ git merge upstream/main -m "Update from template"

# Recreate any uncommited changes
$ git stash apply
```
You may see merge conflicts (ie. lines of code which changed in both your version and the original). VS Code can help you resolve them.