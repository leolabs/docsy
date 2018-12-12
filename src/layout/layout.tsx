import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import TableOfContents from '../components/table-of-contents';

import Header from './header';
import '../styles/layout.scss';
import '../styles/typography.scss';

interface LayoutProps {
  activeSlug: string;
  title?: string;
  description?: string;
  children: any;
}

const Layout: React.FC<LayoutProps> = ({ activeSlug, title, description, children }) => (
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
          title={(activeSlug !== '/' ? title + " – " : "") + data.site.siteMetadata.title}
        >
          <html lang={data.site.siteMetadata.lang} />
          {description && <meta name="description" content={description} />}
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
