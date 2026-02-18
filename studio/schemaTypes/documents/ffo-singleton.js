export default {
  name: 'ffoSingleton',
  type: 'document',
  fields: [
    {
      name: 'phase',
      title: 'Fase',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          {value: 'promo', title: 'Promo'},
          {value: 'active', title: 'Aktiv'},
          {value: 'inactive', title: 'Inaktiv'},
        ],
      },
    },
    {
      name: 'current',
      title: 'Gjeldende utgave',
      type: 'reference',
      to: [
        {
          type: 'ffoEdition',
        },
      ],
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
        title: 'Fotobokfestival',
        subtitle: year,
      }
    },
  },
}
