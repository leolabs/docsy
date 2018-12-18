import React from 'react';
import { Link, graphql } from 'gatsby';
import rehypeReact from 'rehype-react';

import componentMap from '../content-components/index';
import Button from '../content-components/button';

import '../styles/content.scss';
import '../styles/prism-theme.scss';
import backIcon from '../icons/back-circle.svg';
import forwardIcon from '../icons/forward-circle.svg';

import Layout from '../layout/layout';
import { getTitleFromNode } from '../util/title';

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: componentMap,
}).Compiler;

const IndexPage = ({ data, pageContext }: any) => (
  <Layout
    activeSlug={data.markdownRemark.fields.slug}
    title={getTitleFromNode(data.markdownRemark)}
    description={data.markdownRemark.fields.description}
  >
    <article className="content">
      {renderAst(data.markdownRemark.htmlAst)}
      <nav>
        {pageContext.prev && (
          <Button
            to={pageContext.prev.fields.slug}
            type="secondary"
            className="prev"
            text={getTitleFromNode(pageContext.prev)}
            leftIcon={backIcon}
          />
        )}
        {pageContext.next && (
          <Button
            to={pageContext.next.fields.slug}
            type="primary"
            className="next"
            text={getTitleFromNode(pageContext.next)}
            rightIcon={forwardIcon}
          />
        )}
      </nav>
    </article>
  </Layout>
);

export default IndexPage;

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      fields {
        slug
        githubLink
        description
      }
      frontmatter {
        title
      }
      headings {
        value
        depth
      }
    }
  }
`;
