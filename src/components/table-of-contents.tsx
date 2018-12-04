import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import { getTitleFromNode } from '../util/title';
import title from 'title';

const arrangeIntoTree = (edges: any[]) => {
  const nodes = edges.map(edge => edge.node);

  // Get index page, if available
  const tree: any[] = nodes
    .filter(node => node.fields.slug === '/')
    .map(node => ({
      path: '/',
      title: getTitleFromNode(node),
      slug: node.fields.slug,
      children: [],
    }));

  nodes.forEach(node => {
    const pathParts = node.fields.slug.split('/');
    pathParts.shift();
    pathParts.pop();

    let currentLevel = tree;

    pathParts.forEach((part: string, index: number) => {
      const existingPath = currentLevel.filter(level => level.path === part);
      const isLast = index === pathParts.length - 1;

      if (existingPath.length > 0) {
        currentLevel = existingPath[0].children
      } else {
        const newPart = {
          path: part,
          title: isLast ? getTitleFromNode(node) : title(part.replace(/-/g, ' ')),
          slug: node.fields.slug,
          children: [],
        }

        currentLevel.push(newPart)
        currentLevel = newPart.children
      }
    })
  })

  return tree;
}

const TocList = ({tree}: any) => {
  return (<ul>
    {tree.map((entry: any, index: number) => <li key={index}>
      <Link to={entry.slug}>{entry.title}</Link>
      {entry.children && <TocList tree={entry.children} />}
    </li>
    )}
  </ul>)
}

export default () => (
  <StaticQuery
    query={graphql`
    query TableOfContents {
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
              value
            }
          }
        }
      }
    }
  `}
    render={data => (<TocList tree={arrangeIntoTree(data.allMarkdownRemark.edges)} />)}
  />
)
