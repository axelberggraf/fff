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
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (rule) => rule.required().error('Slug is required'),
    },
    {
      name: 'newsType',
      title: 'Type',
      type: 'string',
      options: {
        layout: 'radio',

        list: [
          {value: 'utstilling', title: 'Utstilling'},
          {value: 'notis', title: 'Notis / Annet'},
        ],
      },
    },
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
      name: 'content',
      type: 'textBlock',
    },
    {
      name: 'date',
      title: 'Publiseringsdato',
      type: 'date',
      hidden: ({parent}) => parent.newsType === 'utstilling',
    },
  ],
}
