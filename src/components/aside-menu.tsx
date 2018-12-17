import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import '../styles/components/menu.scss';
import openInNew from '../icons/open-in-new.svg';

export default () => (
  <StaticQuery
    query={graphql`
      query SidebarMenu {
        site {
          siteMetadata {
            asideMenu {
              title
              link
            }
          }
        }
      }
    `}
    render={data => (
      <nav className="aside-menu menu">
        <ul>
          {data.site.siteMetadata.asideMenu.map((m: any) => (
            <li>
              <a href={m.link} target="_blank">
                <span>{m.title}</span>
                <img src={openInNew} alt="Opens in new Tab" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    )}
  />
);
