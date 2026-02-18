export default {
  name: 'ffoEdition',
  type: 'document',
  fields: [
    {
      name: 'year',
      title: 'År',
      type: 'string',
    },
    {
      name: 'slug',
      type: 'slug',
      options: {
        source: 'year',
      },
    },
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'artists',
      title: 'Kunstnere',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'events',
      title: 'Arrangementer',
      type: 'array',
      of: [{type: 'reference', to: {type: 'event'}}],
    },
  ],
  preview: {
    select: {year: 'year'},
    prepare({year}) {
      return {
        title: 'Fotobokfestival',
        subtitle: year,
      }
    },
  },
}
