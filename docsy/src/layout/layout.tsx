import React from 'react';
import Helmet from 'react-helmet';
import Swipeable from 'react-swipeable';
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

  mediaMatcher = typeof window !== 'undefined' && window.matchMedia('(max-width: 576px)');

  openMenu = () => {
    this.setState({
      menuOpen: true,
    });
  };

  closeMenu = () => {
    this.setState({
      menuOpen: false,
    });
  };

  handleMediaQueryChange = (ev: any) => {
    if (!ev.matches) {
      this.setState({
        menuOpen: false,
      });
    }
  };

  componentDidMount() {
    if(this.mediaMatcher) {
      this.mediaMatcher.addListener(this.handleMediaQueryChange);
    }
  }

  componentWillUnmount() {
    if(this.mediaMatcher) {
      this.mediaMatcher.removeListener(this.handleMediaQueryChange);
    }
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
              toggleMenu={this.openMenu}
            />
            <PreviewBadge />
            <Swipeable
              onSwipedRight={this.openMenu}
              onSwipedLeft={this.closeMenu}
            >
              <div
                className={classNames('backdrop', { open: this.state.menuOpen })}
                onClick={this.closeMenu}
              />
              <main>
                <aside
                  className={classNames('left', { open: this.state.menuOpen })}
                >
                  <MenuHeader toggleMenu={this.closeMenu} />
                  <TableOfContents activeSlug={activeSlug} />
                  <AsideMenu />
                </aside>
                {children}
                <aside className="right" />
              </main>
            </Swipeable>
          </>
        )}
      />
    );
  }
}

export default Layout;
