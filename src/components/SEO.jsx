import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import LanguageContext from '../i18n/LanguageContext';

export default class SEO extends Component {
  static contextType = LanguageContext;

  static propTypes = {
    description: PropTypes.string,
    meta: PropTypes.array,
    keywords: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string.isRequired
  };

  static defaultProps = {
    meta: [],
    keywords: []
  };

  render() {
    const { description, title, meta, keywords } = this.props;
    const language = this.context;
    const lang = language.locale || language.detected;

    return (
      <StaticQuery
        query={detailsQuery}
        render={data => {
          const metaDescription = description || data.site.siteMetadata.description;
          return (
            <Helmet
              htmlAttributes={{ lang }}
              title={title}
              titleTemplate={`%s | ${data.site.siteMetadata.title}`}
              meta={[
                {
                  name: `description`,
                  content: metaDescription
                },
                {
                  property: `og:title`,
                  content: title
                },
                {
                  property: `og:description`,
                  content: metaDescription
                },
                {
                  property: `og:type`,
                  content: `website`
                },
                {
                  name: `twitter:card`,
                  content: `summary`
                },
                {
                  name: `twitter:creator`,
                  content: data.site.siteMetadata.author
                },
                {
                  name: `twitter:title`,
                  content: title
                },
                {
                  name: `twitter:description`,
                  content: metaDescription
                }
              ]
                .concat(
                  keywords.length > 0
                    ? {
                        name: 'keywords',
                        content: keywords.join(', ')
                      }
                    : []
                )
                .concat(meta)}
            />
          );
        }}
      />
    );
  }
}

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`;
