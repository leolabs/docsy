const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`);
const siteConfig = require('./config/site-config');

const createGithubUrl = node => {
  const githubBase = siteConfig.githubRepo + '/blob/' + siteConfig.githubBranch;
  return githubBase + node.fileAbsolutePath.replace(__dirname, '');
};

exports.onCreateNode = ({ node, getNode, actions: { createNodeField } }) => {
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    const cleanSlug = slug.replace(/[0-9]+-/g, '').replace(/^\//, '').replace(/index\/$/, '');

    createNodeField({
      node,
      name: `slug`,
      value: '/' + (cleanSlug === 'index/' ? '' : cleanSlug),
    });

    createNodeField({
      node,
      name: `githubLink`,
      value: createGithubUrl(node),
    });
  }
}

exports.createPages = ({ graphql, actions: { createPage } }) => {
  return new Promise(resolve => {
    graphql(`
      {
        allMarkdownRemark(sort: {fields: fileAbsolutePath, order: ASC}) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
              headings {
                value,
                depth
              }
            }
          }
        }
      }
    `).then(result => {
      const pages = result.data.allMarkdownRemark.edges;

      pages.forEach(({ node }, index) => {
        const next = index === pages.length - 1 ? null : pages[index + 1].node;
        const prev = index === 0 ? null : pages[index - 1].node;

        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/content-page.tsx`),
          context: {
            slug: node.fields.slug,
            prev,
            next
          },
        });
      });
      resolve();
    })
  })
}
