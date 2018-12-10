import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import { getTitleFromNode } from '../util/title';
import title from 'title';
import classNames from 'classnames';

import '../styles/components/table-of-contents.scss';

interface TreeNode {
  path: string;
  title: string;
  isLinkable: boolean;
  slug: string;
  depth: number;
  children: TreeNode[];
}

const arrangeIntoTree = (edges: any[]) => {
  const nodes = edges.map(edge => edge.node);

  // Get index page, if available
  const tree: TreeNode[] = nodes
    .filter(node => node.fields.slug === '/')
    .map(node => ({
      path: '/',
      title: getTitleFromNode(node),
      isLinkable: true,
      depth: 0,
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
        if (isLast) {
          existingPath[0].title = getTitleFromNode(node);
          existingPath[0].isLinkable = true;
          existingPath[0].slug = node.fields.slug;
        }

        currentLevel = existingPath[0].children;
      } else {
        const newPart = {
          path: part,
          title: isLast
            ? getTitleFromNode(node)
            : title(part.replace(/-/g, ' ')),
          slug: node.fields.slug,
          isLinkable: isLast,
          depth: index,
          children: [],
        };

        currentLevel.push(newPart);
        currentLevel = newPart.children;
      }
    });
  });

  return tree;
};

const TocList = ({ tree, activeSlug }: any) => {
  return (
    <ul>
      {tree.map((entry: TreeNode, index: number) => (
        <li
          key={index}
          className={classNames(
            {
              active: entry.isLinkable && entry.slug === activeSlug,
              hasChildren: !!entry.children.length,
              isLinkable: entry.isLinkable,
            },
            `depth-${entry.depth}`
          )}
        >
          {entry.isLinkable ? (
            <Link to={entry.slug}>{entry.title}</Link>
          ) : (
            <span>{entry.title}</span>
          )}
          {entry.children && (
            <TocList activeSlug={activeSlug} tree={entry.children} />
          )}
        </li>
      ))}
    </ul>
  );
};

interface TableOfContentsProps {
  activeSlug: string;
}

export default ({ activeSlug }: TableOfContentsProps) => (
  <StaticQuery
    query={graphql`
      query TableOfContents {
        allMarkdownRemark(sort: { fields: fileAbsolutePath, order: ASC }) {
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
    render={data => (
      <nav className="table-of-contents">
        <TocList
          activeSlug={activeSlug}
          tree={arrangeIntoTree(data.allMarkdownRemark.edges)}
        />
      </nav>
    )}
  />
);
