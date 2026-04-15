import type { Block } from 'payload'

export const UpcomingEvents: Block = {
  slug: 'upcomingEvents',
  interfaceName: 'UpcomingEventsBlock',
  labels: {
    singular: 'Nächste Termine',
    plural: 'Nächste Termine',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Termine',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Die nächsten Veranstaltungen',
    },
    {
      name: 'text',
      type: 'textarea',
    },
    {
      name: 'count',
      type: 'number',
      required: true,
      defaultValue: 3,
      min: 1,
      max: 12,
    },
    {
      name: 'showLocation',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'linkLabel',
      type: 'text',
      defaultValue: 'Alle Termine ansehen',
    },
    {
      name: 'linkHref',
      type: 'text',
      defaultValue: '/termine',
    },
    {
      name: 'backgroundStyle',
      type: 'select',
      defaultValue: 'light',
      options: [
        { label: 'Hell', value: 'light' },
        { label: 'Blau', value: 'blue' },
        { label: 'Grün', value: 'green' },
      ],
    },
  ],
}