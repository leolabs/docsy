import React from 'react';

import { StaticQuery, graphql } from 'gatsby';

import githubIcon from '../icons/github.svg';

import '../styles/components/preview-badge.scss';

interface GithubData {
  githubRepo: string;
  githubBranch: string;
  githubReviewId: string;
  githubCommitRef: string;
  mainBranch: string;
  buildContext: 'production' | 'deploy-preview' | 'branch-deploy';
}

const generateLinkFromGithubData = (data: GithubData) => {
  if (data.buildContext !== 'deploy-preview') {
    return data.githubRepo;
  }

  if (data.githubReviewId) {
    return data.githubRepo + '/pull/' + data.githubReviewId;
  }

  return '';
};

const PreviewBadge: React.FC = () => (
  <StaticQuery
    query={graphql`
      query PreviewBadge {
        site {
          siteMetadata {
            githubRepo
            githubBranch
            githubReviewId
            githubCommitRef
            mainBranch
            buildContext
          }
        }
      }
    `}
    render={data => (
      <>
        {data.site.siteMetadata.buildContext === 'deploy-preview' && (
          <a
            className="preview-badge"
            target="_blank"
            href={generateLinkFromGithubData(data.site.siteMetadata)}
          >
            <img src={githubIcon} alt="GitHub Icon" />
            <strong>Preview Build</strong>
          </a>
        )}
      </>
    )}
  />
);

export default PreviewBadge;
