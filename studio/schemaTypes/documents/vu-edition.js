export default {
  name: 'vuEdition',
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
      options: {source: 'year'},
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
  // preview: {
  //   prepare() {
  //     return {
  //       title: 'FFF',
  //     }
  //   },
  // },
}
