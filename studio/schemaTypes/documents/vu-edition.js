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
  ],
  // preview: {
  //   prepare() {
  //     return {
  //       title: 'FFF',
  //     }
  //   },
  // },
}
