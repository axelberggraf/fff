import {BsBoxArrowInRight} from 'react-icons/bs'
const smallRender = (props) => <span style={{fontSize: '0.8rem'}}>{props.children}</span>
const centerRender = (props) => <p style={{textAlign: 'center'}}>{props.children}</p>

import {BsArrowUpRightSquare, BsTextLeft, BsTextCenter, BsTextRight} from 'react-icons/bs'
import {GoLaw} from 'react-icons/go'

const mediumRender = (props) => <p style={{fontSize: '1.2rem'}}>{props.children}</p>
export const TextAlign = (props) => {
  return (
    <div style={{textAlign: props.value ? props.value : 'left', width: '100%'}}>
      {props.children}
    </div>
  )
}
export default {
  title: 'Tekstblokk',
  name: 'textBlock',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'Normal', value: 'normal'},
        {title: 'Medium', value: 'medium', component: mediumRender},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Ordered', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {
            title: 'Left',
            value: 'left',
            icon: BsTextLeft,
            component: (props) => TextAlign(props),
          },
          {
            title: 'Center',
            value: 'center',
            icon: BsTextCenter,
            component: (props) => TextAlign(props),
          },
          {
            title: 'Right',
            value: 'right',
            icon: BsTextRight,
            component: (props) => TextAlign(props),
          },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              {
                name: 'type',
                type: 'string',
                options: {
                  layout: 'radio',
                  list: [
                    {value: 'internal', title: 'Internal'},
                    {value: 'external', title: 'External'},
                  ],
                },
              },
              {
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: (Rule) => Rule.uri({scheme: ['http', 'https', 'tel', 'mailto']}),
                hidden: ({parent}) => parent.type !== 'external',
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                type: 'boolean',
                hidden: ({parent}) => parent.type !== 'external',
              },
              {
                name: 'internalLink',
                type: 'reference',
                to: [
                  {
                    type: 'news',
                  },
                  {
                    type: 'home',
                  },
                ],
                options: {
                  disableNew: true,
                },
                hidden: ({parent}) => !parent.type || parent?.type == 'external',
              },
            ],
          },
        ],
      },
    },
    {
      type: 'object',
      name: 'carousel',

      fields: [
        {
          type: 'array',
          name: 'slides',
          of: [{type: 'img'}],
        },
      ],
    },
    {
      type: 'image',
      fields: [
        {
          type: 'string',
          name: 'alt',
          title: 'Alternative text',
        },
        {
          name: 'style',
          type: 'string',
          options: {
            layout: 'radio',

            list: [
              {value: 'left', title: 'Left'},
              {value: 'center', title: 'Center'},
            ],
          },
        },
      ],
    },
    // {
    //   type: 'object',
    //   name: 'button',
    //   title: 'Button',
    //   icon: BsArrowUpRightSquare,
    //   fields: [
    //     {
    //       name: 'text',
    //       title: 'Text',
    //       type: 'string',
    //     },
    //     {
    //       name: 'type',
    //       title: 'Type',
    //       type: 'string',
    //       initialValue: 'external',
    //       options: {
    //         layout: 'radio',
    //         list: [
    //           {
    //             value: 'internal',
    //             title: 'Internal link',
    //           },
    //           {
    //             value: 'external',
    //             title: 'External link',
    //           },
    //         ],
    //       },
    //     },
    //     {
    //       name: 'url',
    //       title: 'URL',
    //       type: 'url',
    //       validation: (Rule) => Rule.uri({scheme: ['http', 'https', 'tel', 'mailto']}),
    //       hidden: ({parent}) => !parent.type || parent?.type == 'internal',
    //     },
    //     {
    //       name: 'internalLink',
    //       type: 'reference',
    //       to: [
    //         {
    //           type: 'customType',
    //         },
    //         {
    //           type: 'fontFamily',
    //         },
    //         {
    //           type: 'info',
    //         },
    //         {
    //           type: 'privacy',
    //         },
    //         {
    //           type: 'home',
    //         },
    //       ],
    //       hidden: ({parent}) => !parent.type || parent?.type == 'external',
    //     },
    //     {
    //       name: 'style',
    //       title: 'Style',
    //       type: 'string',
    //       options: {
    //         layout: 'radio',
    //         list: [
    //           {
    //             value: 'flex-start',
    //             title: 'Left',
    //           },
    //           {
    //             value: 'center',
    //             title: 'Center',
    //           },
    //           {
    //             value: 'flex-end',
    //             title: 'Right',
    //           },
    //         ],
    //       },
    //     },
    //   ],
    // },
  ],
}
