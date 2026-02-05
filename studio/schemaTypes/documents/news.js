export default {
    name: 'news',
    type: 'document',
    fields: [
        {
            name: 'title',
            type: 'string'
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
            name: 'content',
            type: 'textBlock'
        },
        {
            name: 'date',
            description: 'Publiseringsdato',
            type: 'date'
        }
    ]
}