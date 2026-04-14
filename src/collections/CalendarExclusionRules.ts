
import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const CalendarExclusionRules: CollectionConfig = {
  slug: 'calendarExclusionRules',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'value',
    defaultColumns: ['ruleType', 'value', 'isActive'],
  },
  fields: [
    {
      name: 'source',
      type: 'relationship',
      relationTo: 'calendarSources',
      required: true,
    },
    {
      name: 'ruleType',
      type: 'select',
      required: true,
      options: [
        { label: 'UID equals', value: 'UID_EQUALS' },
        { label: 'Title contains', value: 'TITLE_CONTAINS' },
        { label: 'Location contains', value: 'LOCATION_CONTAINS' },
        { label: 'Category equals', value: 'CATEGORY_EQUALS' },
      ],
    },
    {
      name: 'value',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}