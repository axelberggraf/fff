export default {
  name: 'singletonPage',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'slug',
      type: 'slug',
      // hidden: true,
      readOnly: true,
    },
    {
      name: 'content',
      type: 'textBlock',
    },
  ],
}
