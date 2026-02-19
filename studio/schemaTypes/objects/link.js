export default {
  name: 'linkObject',
  type: 'object',
  title: 'Link',
  fields: [
    {
      name: 'linkText',
      title: 'Link Text',
      type: 'string',
    },
    {
      name: 'type',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          {value: 'internal', title: 'Internal'},
          {value: 'external', title: 'External'},
        ],
      },
    },
    {
      name: 'url',
      type: 'url',
      title: 'URL',
      validation: (Rule) => Rule.uri({scheme: ['http', 'https', 'tel', 'mailto']}),
      hidden: ({parent}) => parent?.type !== 'external',
    },
    {
      title: 'Open in new tab',
      name: 'blank',
      type: 'boolean',
      hidden: ({parent}) => parent?.type !== 'external',
    },
    {
      name: 'internalLink',
      type: 'reference',
      to: [
        {
          type: 'news',
        },
        {
          type: 'home',
        },
        {
          type: 'event',
          options: {
            filter: 'archived == true',
          },
        },
        {
          type: 'page',
        },
        {
          type: 'singletonPage',
        },
      ],
      options: {
        disableNew: true,
      },
      hidden: ({parent}) => !parent?.type || parent?.type == 'external',
    },
  ],
}
