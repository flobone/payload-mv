import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { authenticated } from '../access/authenticated'

export const Events: CollectionConfig = {
  slug: 'events',
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'startsAt', 'isPublished', 'isHidden'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField({
      required: false,
    }),
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'startsAt',
      type: 'date',
      required: true,
    },
    {
      name: 'endsAt',
      type: 'date',
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'isHidden',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'externalUid',
      type: 'text',
      unique: true,
      index: true,
    },
    {
      name: 'categories',
      type: 'array',
      fields: [
        {
          name: 'value',
          type: 'text',
        },
      ],
    },
    {
      name: 'exclusionReason',
      type: 'text',
    },
    {
      name: 'lastImportedAt',
      type: 'date',
    },
    {
      name: 'overrideTitle',
      type: 'text',
    },
    {
      name: 'overrideDescription',
      type: 'textarea',
    },
    {
      name: 'overrideLocation',
      type: 'text',
    },
    {
      name: 'overrideImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'source',
      type: 'relationship',
      relationTo: 'calendarSources',
    },
  ],
}