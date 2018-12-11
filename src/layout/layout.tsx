import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import TableOfContents from '../components/table-of-contents';

import Header from './header';
import '../styles/layout.scss';
import '../styles/typography.scss';

interface LayoutProps {
  activeSlug: string;
  children: any;
}

const Layout: React.FC<LayoutProps> = ({ activeSlug, children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        >
          <html lang={data.site.siteMetadata.lang} />
        </Helmet>
        <Header siteTitle={data.site.siteMetadata.title} />
        <main>
          <aside className="left">
            <TableOfContents activeSlug={activeSlug} />
            {/* TODO: Aside menu */}
          </aside>
          {children}
          <aside className="right"></aside>
        </main>
      </>
    )}
  />
)

export default Layout
