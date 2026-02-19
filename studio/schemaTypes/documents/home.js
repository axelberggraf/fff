export default {
  name: 'home',
  type: 'document',
  fields: [
    {
      name: 'highlight',
      type: 'object',
      options: {
        collapsible: true,
      },
      fields: [
        {
          name: 'linkTo',
          type: 'linkObject',
        },
        // {
        //   name: 'type',
        //   type: 'string',
        //   options: {
        //     layout: 'radio',
        //     list: [
        //       {value: 'internal', title: 'Intern side'},
        //       {value: 'external', title: 'Ekstern side'},
        //     ],
        //   },
        // },
        // {
        //   name: 'internalPage',
        //   type: 'reference',
        //   to: [{type: 'news'}, {type: 'medlemsNytt'}, {type: 'vuSingleton'}],
        //   hidden: ({parent}) => parent?.type !== 'internal',
        // },
        // {
        //   name: 'externalUrl',
        //   title: 'External URL',
        //   type: 'url',
        //   hidden: ({parent}) => parent?.type !== 'external',
        // },
      ],
    },
    {
      name: 'intro',
      type: 'text',
    },
    {
      name: 'news',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {type: 'news'},
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'FFF',
      }
    },
  },
}
