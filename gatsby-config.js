const userConfig = require('./config/site-config');

module.exports = {
  siteMetadata: {
    ...userConfig,
    asideMenu: [{ title: '', link: '' }, ...userConfig.asideMenu],
    githubBranch: process.env.BRANCH || userConfig.mainBranch,
    githubReviewId: process.env.REVIEW_ID || '',
    githubCommitRef: process.env.COMMIT_REF || '',
    buildContext: process.env.CONTEXT || 'production',
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content/`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'assets',
            },
          },
          'gatsby-remark-component',
          'gatsby-remark-prismjs',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800,
            },
          },
          'gatsby-remark-external-links',
          'gatsby-remark-responsive-iframe',
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: userConfig.title,
        short_name: userConfig.shortTitle,
        start_url: '/',
        background_color: userConfig.primaryColor,
        theme_color: userConfig.primaryColor,
        display: 'minimal-ui',
        icon: userConfig.icon, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
};
