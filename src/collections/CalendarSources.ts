import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const CalendarSources: CollectionConfig = {
  slug: 'calendarSources',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'isActive', 'lastSyncedAt', 'lastSyncStatus'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'icsUrl',
      type: 'text',
      required: true,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'lastSyncedAt',
      type: 'date',
    },
    {
      name: 'lastSyncStatus',
      type: 'text',
    },
    {
      name: 'lastSyncMessage',
      type: 'textarea',
    },
  ],
}