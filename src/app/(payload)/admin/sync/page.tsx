import config from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import { SyncPanel } from './SyncPanel'

function formatDateTime(value: string | null | undefined): string {
  if (!value) return '—'

  return new Intl.DateTimeFormat('de-DE', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export default async function SyncAdminPage() {
  const payload = await getPayload({ config })

  const [sourcesResult, eventsResult] = await Promise.all([
    payload.find({
      collection: 'calendarSources',
      limit: 100,
      sort: 'name',
      depth: 0,
    }),
    payload.find({
      collection: 'events',
      limit: 10,
      sort: '-lastImportedAt',
      depth: 0,
    }),
  ])

  const sources = sourcesResult.docs as any[]
  const events = eventsResult.docs as any[]

  return (
    <div style={{ padding: '2rem', display: 'grid', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Kalendersync
        </h1>
        <p style={{ color: 'var(--theme-text-secondary)', maxWidth: 760 }}>
          Starte hier die Synchronisation der ICS-Kalenderquellen. Die importierten
          Termine werden in der Events-Collection gespeichert.
        </p>
      </div>

      <div
        style={{
          border: '1px solid var(--theme-elevation-150)',
          borderRadius: 12,
          padding: '1.25rem',
          background: 'var(--theme-elevation-0)',
        }}
      >
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem' }}>
          Aktion
        </h2>
        <SyncPanel />
      </div>

      <div
        style={{
          border: '1px solid var(--theme-elevation-150)',
          borderRadius: 12,
          padding: '1.25rem',
          background: 'var(--theme-elevation-0)',
        }}
      >
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem' }}>
          Quellenstatus
        </h2>

        {sources.length === 0 ? (
          <p>Es sind noch keine Kalenderquellen angelegt.</p>
        ) : (
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {sources.map((source) => (
              <div
                key={source.id}
                style={{
                  border: '1px solid var(--theme-elevation-100)',
                  borderRadius: 10,
                  padding: '1rem',
                }}
              >
                <div style={{ fontWeight: 600 }}>{source.name}</div>
                <div style={{ fontSize: '0.95rem', color: 'var(--theme-text-secondary)' }}>
                  Aktiv: {source.isActive ? 'Ja' : 'Nein'}
                </div>
                <div style={{ fontSize: '0.95rem', color: 'var(--theme-text-secondary)' }}>
                  Letzter Sync: {formatDateTime(source.lastSyncedAt)}
                </div>
                <div style={{ fontSize: '0.95rem', color: 'var(--theme-text-secondary)' }}>
                  Status: {source.lastSyncStatus ?? '—'}
                </div>
                <div style={{ fontSize: '0.95rem', color: 'var(--theme-text-secondary)' }}>
                  Meldung: {source.lastSyncMessage ?? '—'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        style={{
          border: '1px solid var(--theme-elevation-150)',
          borderRadius: 12,
          padding: '1.25rem',
          background: 'var(--theme-elevation-0)',
        }}
      >
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem' }}>
          Zuletzt importierte Termine
        </h2>

        {events.length === 0 ? (
          <p>Es wurden noch keine Termine importiert.</p>
        ) : (
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {events.map((event) => (
              <div
                key={event.id}
                style={{
                  border: '1px solid var(--theme-elevation-100)',
                  borderRadius: 10,
                  padding: '1rem',
                }}
              >
                <div style={{ fontWeight: 600 }}>{event.overrideTitle || event.title}</div>
                <div style={{ fontSize: '0.95rem', color: 'var(--theme-text-secondary)' }}>
                  Start: {formatDateTime(event.startsAt)}
                </div>
                <div style={{ fontSize: '0.95rem', color: 'var(--theme-text-secondary)' }}>
                  Sichtbar: {event.isHidden ? 'Ausgeblendet' : 'Sichtbar'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}