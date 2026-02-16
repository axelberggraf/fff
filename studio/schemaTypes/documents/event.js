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
    {
      name: 'eventType',
      title: 'Type',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          {value: 'fff', title: 'FFF'},
          {value: 'ffo', title: 'Fotobokfestivalen'},
          {value: 'vu', title: 'Vårutstillingen'},
        ],
      },
    },
    {
      name: 'archived',
      title: 'Arkivert',
      type: 'boolean',
    },
    {
      name: 'thumbnail',
      type: 'image',
      fields: [
        {
          name: 'alt',
          title: 'Alt. tekst',
          type: 'string',
        },
      ],
      options: {
        hotspot: true,
      },
    },
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
      name: 'location',
      type: 'string',
    },
    {
      name: 'date',
      title: 'Dato (Start-dato)',
      type: 'date',
    },
    {
      name: 'endDate',
      title: 'Slutt-Dato (Hvis relevant)',
      type: 'date',
    },
    {
      name: 'content',
      type: 'textBlock',
    },
  ],
}
