export default {
  name: 'medlemsNytt',
  title: 'Medlemsnytt',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'thumbnail',
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: 'string',
        },
      ],
      options: {
        hotspot: true,
      },
    },
    {
      name: 'url',
      type: 'url',
      validation: (rule) => rule.required().error('URL is required'),
    },
    // {
    //   name: 'newsType',
    //   title: 'Type',
    //   type: 'string',
    //   options: {
    //     layout: 'radio',

    //     list: [
    //       {value: 'utstilling', title: 'Utstilling'},
    //       {value: 'notis', title: 'Notis / Annet'},
    //     ],
    //   },
    // },
    {
      name: 'dateStart',
      description: 'Dato Start',
      type: 'date',
      hidden: ({parent}) => parent.newsType !== 'utstilling',
    },
    {
      name: 'dateEnd',
      title: 'Dato Slutt',
      type: 'date',
      hidden: ({parent}) => parent.newsType !== 'utstilling',
    },
    {
      name: 'date',
      title: 'Publiseringsdato',
      type: 'date',
      hidden: ({parent}) => parent.newsType === 'utstilling',
    },
  ],
}
