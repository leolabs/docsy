import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import TableOfContents from '../components/table-of-contents';
import AsideMenu from '../components/aside-menu';

import Header from './header';
import '../styles/layout.scss';
import '../styles/typography.scss';

import PreviewBadge from '../components/preview-badge';
import classNames from 'classnames';
import MenuHeader from './menu-header';

interface LayoutProps {
  activeSlug: string;
  title?: string;
  description?: string;
  children: any;
}

interface LayoutState {
  menuOpen: boolean;
}

class Layout extends React.Component<LayoutProps, LayoutState> {
  state = {
    menuOpen: false,
  };

  mediaMatcher = window.matchMedia('(max-width: 576px)');

  toggleMenu = () => {
    this.setState(state => ({
      menuOpen: !state.menuOpen,
    }));
  };

  handleMediaQueryChange = (ev: any) => {
    if (!ev.matches) {
      this.setState({
        menuOpen: false,
      });
    }
  };

  componentDidMount() {
    this.mediaMatcher.addListener(this.handleMediaQueryChange);
  }

  componentWillUnmount() {
    this.mediaMatcher.removeListener(this.handleMediaQueryChange);
  }

  render() {
    const { activeSlug, title, description, children } = this.props;

    return (
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
              title={
                (activeSlug !== '/' ? title + ' – ' : '') +
                data.site.siteMetadata.title
              }
            >
              <html lang={data.site.siteMetadata.lang} />
              {description && <meta name="description" content={description} />}
            </Helmet>
            <Header
              siteTitle={data.site.siteMetadata.title}
              toggleMenu={this.toggleMenu}
            />
            <PreviewBadge />
            <div
              className={classNames('backdrop', { open: this.state.menuOpen })}
              onClick={this.toggleMenu}
            />
            <main>
              <aside
                className={classNames('left', { open: this.state.menuOpen })}
              >
                <MenuHeader toggleMenu={this.toggleMenu} />
                <TableOfContents activeSlug={activeSlug} />
                <AsideMenu />
              </aside>
              {children}
              <aside className="right" />
            </main>
          </>
        )}
      />
    );
  }
}

export default Layout;
