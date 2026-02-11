export default {
  name: 'event',
  type: 'document',
  options: {
    modal: {
      type: 'popover',
      width: 'auto',
    },
  },
  fields: [
    // {
    //   name: 'mainImage',
    //   type: 'image',
    //   fields: [
    //     {
    //       name: 'alt',
    //       title: 'Alt. tekst',
    //       type: 'string',
    //     },
    //   ],
    // },
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
    },
    {
      name: 'date',
      title: 'Dato',
      type: 'date',
    },
    // {
    //   name: 'endDate',
    //   title: 'Slutt-Dato',
    //   type: 'date',
    // },
  ],
}
