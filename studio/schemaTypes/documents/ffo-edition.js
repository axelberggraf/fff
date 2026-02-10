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
      name: 'artists',
      title: 'Kunstnere',
      type: 'array',
      of: [{type: 'string'}],
    },
  ],
  preview: {
    select: {year: 'year'},
    prepare({year}) {
      return {
        title: 'Fotobokfestivalen',
        subtitle: year,
      }
    },
  },
}
