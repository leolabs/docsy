# File Structure

Docsy creates its document hierarchy based on the file hierarchy in the content
directory. Entries are ordered alphabetically, so you can specify the order of files
and folders by prepending them with a number. These numbers will not be visible in
the build. Folder names are used to generate the section titles in your documentation.

## Markdown Files

You can define certain properties like title and description in the frontmatter of
any Markdown file. If those values are not set, they will be derived from the content.

```
---
title: Getting Started
description: "This is the longer description that will be used for SEO purposes"
---

...your content here
```

## Including Resources

If you want to include images or other files, you can place them in the same folder
as your Markdown file and use relative links. Images will automatically be optimized
for fast loading.
