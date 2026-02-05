export default {
  name: 'meta',
  title: 'Meta / SEO',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fieldsets: [
    {name: 'og', title: 'Open Graph', description: 'Appears when sharing in social media etc.'},
  ],
  fields: [
    // {
    //   name: 'pageTitle',
    //   title: 'Page title',
    //   description: 'Appears in browser tab',
    //   type: 'string',
    // },
    {
      name: 'ogTitle',
      title: 'Title',
      fieldset: 'og',
      type: 'string',
    },
    {
      name: 'ogDescription',
      title: 'Description',
      fieldset: 'og',
      type: 'text',
    },
    {
      name: 'ogImage',
      title: 'Image',
      fieldset: 'og',
      type: 'image',
    },
  ],
}
