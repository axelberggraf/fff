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
