export const getTitleFromNode = (node: any) => {
    if(node.frontmatter && node.frontmatter.title) {
        return node.frontmatter.title;
    }

    if(node.headings && node.headings.length) {
        return node.headings[0].value;
    }
}