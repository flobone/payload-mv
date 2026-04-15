import type { GlobalConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  access: {
    read: () => true,
    update: authenticated,
  },
  admin: {
    group: 'Website',
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          defaultValue: 'Musikverein Müsen 1919 e.V.',
        },
        {
          name: 'headline',
          type: 'text',
          required: true,
          defaultValue: 'Musik, Gemeinschaft und Heimatgefühl.',
        },
        {
          name: 'text',
          type: 'textarea',
        },
        {
          name: 'primaryButtonLabel',
          type: 'text',
          defaultValue: 'Zu den Terminen',
        },
        {
          name: 'primaryButtonLink',
          type: 'text',
          defaultValue: '/termine',
        },
        {
          name: 'secondaryButtonLabel',
          type: 'text',
          defaultValue: 'Vereinschronik',
        },
        {
          name: 'secondaryButtonLink',
          type: 'text',
          defaultValue: '/verein/chronik',
        },
        {
          name: 'showLogo',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'featuredEvent',
      type: 'group',
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          defaultValue: 'Nächste Veranstaltung',
        },
        {
          name: 'mode',
          type: 'select',
          defaultValue: 'auto',
          options: [
            { label: 'Automatisch aus Events', value: 'auto' },
            { label: 'Manuell pflegen', value: 'manual' },
          ],
        },
        {
          name: 'manualTitle',
          type: 'text',
        },
        {
          name: 'manualDateText',
          type: 'text',
        },
        {
          name: 'manualLocation',
          type: 'text',
        },
        {
          name: 'manualLink',
          type: 'text',
        },
      ],
    },
    {
      name: 'aboutSection',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Wer wir sind',
        },
        {
          name: 'text',
          type: 'richText',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'linkLabel',
          type: 'text',
          defaultValue: 'Mehr über den Verein',
        },
        {
          name: 'linkHref',
          type: 'text',
          defaultValue: '/ueber-uns',
        },
      ],
    },
    {
      name: 'youthSection',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Jugendarbeit',
        },
        {
          name: 'text',
          type: 'richText',
        },
        {
          name: 'linkLabel',
          type: 'text',
          defaultValue: 'Mehr zur Jugendarbeit',
        },
        {
          name: 'linkHref',
          type: 'text',
          defaultValue: '/jugendarbeit',
        },
      ],
    },
    {
      name: 'contactSection',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Kontakt und Mitmachen',
        },
        {
          name: 'text',
          type: 'textarea',
        },
        {
          name: 'linkLabel',
          type: 'text',
          defaultValue: 'Kontakt aufnehmen',
        },
        {
          name: 'linkHref',
          type: 'text',
          defaultValue: '/kontakt',
        },
      ],
    },
  ],
}