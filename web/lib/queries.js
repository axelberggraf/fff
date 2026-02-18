export const IMG = `
        alt,
        caption,
        asset->{
            _id,
            metadata{
                dimensions,
                lqip
            }
        }
`;
export const LINK = `
    linkText,
    type,
    type == "internal" => {
        ...,
        "internalLink": internalLink->{
          _type,
          eventType,
          "slug": slug.current,
          "parent": parent -> {"slug": slug.current}
        },
      },
    type == "external" => {
        url,
        blank
      },
`;

export const SETTINGS = `
    meta{
        ogTitle,
        ogDescription,
        ogImage{
            asset->{url}
        }
    },
    globalFont->{
        files[]{
            asset{
                _ref
            }
        }
    },
    themes[]{
        name,
        fg,
        bg,
        accent
    },
    "fonts": uiFonts[]->{
        title,
        "woff2": files[asset->mimeType match "font/woff2"][0] {
            asset-> {
                _id,
                mimeType
            }
        },
    },
     "menuFonts":   *[_id == "singleton-home"][0].fontPreviews[]
        {
          _key,
          fontFamily->
        {
        title,
            slug{
                current
                }
            }
        },
    eula{
        asset->{
            url
        }
    }

`;

export const TEXTBLOCK = `
    ...,
    markDefs[]{
        ...,
        _type == "internalLink" => {
            "slug": @.reference->slug
        },
    _type == "link" => {
        ...,
        "internalLink": internalLink->{
          _type,
          "slug": slug.current
        },
      },
    _type == "eula" => {
        "eulaFileUrl":  *[_id == "singleton-settings"][0].eula.asset->url  
      },
    },
    _type == "button" => {
        ...,
        "resolvedLink": select(
            type == "internal" => internalLink->slug.current,
            type == "external" => url
        )
  },
      _type == 'image' => {
        style,
        ${IMG}
    },
      _type == 'linkList' => {
        links[]{
            ${LINK}
        }
    },
      _type == 'carousel' => {
        slides[]{
            ${IMG}
        }
    },
    `;

export const INUSE = `
    inUse{
        title,
        slides[]{
            type,
            type == 'image' => {
                image{
                alt,
                asset->{
                    _id,
                    metadata{
                        lqip,
                        dimensions{
                            width,
                            height,
                            aspectRatio
                        }
                    }
                }
                },
            },
            type == 'video' => {
                video{
                asset->{
                    url
                    }
                },
            },
            client,
            agency,
            fonts[]->{
                title,
                slug{
                    current
                }
            }
        }
    }
`;

export const PAGEBUILDER = `
    pageBuilder[]{
        _type == 'typetester' => {
            _key,
            _type,
            defaultCut->{
                _id,
                "woff2": files[asset->mimeType match "font/woff2"][0] {
                    asset-> {
                        _id,
                        mimeType
                    }
                 },
            },
            activeStyles,
            length,
        },
        _type == 'variableTypetester' => {
            _key,
            _type,
            defaultCut->{
                title,
                _id,
                "woff": files[asset->mimeType match "font/woff"][0] {
                    asset-> {
                        _id,
                        mimeType
                    }
                 },
            },
            length,
        },
        _type == 'alternatePreview' => {
            _key,
            _type,
            title,
            previews[]{
                set,
                title,
                previewText
            }
        },
    }
`;
