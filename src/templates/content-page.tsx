import React from 'react'
import { Link, graphql } from "gatsby"
import rehypeReact from "rehype-react"

import componentMap from "../components/index";

import Layout from '../layout/layout'

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: componentMap
}).Compiler

const IndexPage = ({data}: any) => (
  <Layout>
    <article>{renderAst(data.markdownRemark.htmlAst)}</article>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      headings {
        value
        depth
      }
    }
  }
`