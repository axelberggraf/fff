export default {
  name: 'vuSingleton',
  type: 'document',
  fields: [
    {
      name: 'year',
      title: 'År',
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
      of: [{type: 'event'}],
    },
  ],
  preview: {
    select: {year: 'year'},
    prepare({year}) {
      return {
        title: 'Vårutstillingen',
        subtitle: year,
      }
    },
  },
}
