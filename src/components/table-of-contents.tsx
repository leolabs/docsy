import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import { getTitleFromNode } from '../util/title';
import title from 'title';

const arrangeIntoTree = (edges: any[]) => {
  const tree: any[] = [];

  edges.map(edge => edge.node).forEach(node => {
    const pathParts = node.fields.slug.split('/');
    pathParts.shift();
    pathParts.pop();

    let currentLevel = tree;

    pathParts.forEach((part: string) => {
      const existingPath = currentLevel.filter(level => level.path === part);

      if (existingPath.length > 0) {
        currentLevel = existingPath[0].children
      } else {
        const newPart = {
          path: part,
          name: title(part.replace(/-/g, ' ')),
          title: getTitleFromNode(node),
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

const TocList = ({tree}) => {
  return (<ul>
    {tree.map((entry: any) => <>
      <li><Link to={entry.slug}>{entry.children.length ? entry.name : entry.title}</Link></li>
      {entry.children && <TocList tree={entry.children} />}
    </>)}
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
