export default {
  name: 'event',
  type: 'object',
  options: {
    modal: {
      type: 'popover',
      width: 'auto',
    },
  },
  fields: [
    {
      name: 'mainImage',
      type: 'image',
      fields: [
        {
          name: 'alt',
          title: 'Alt. tekst',
          type: 'string',
        },
      ],
    },
    {
      name: 'title',
      type: 'string',
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
