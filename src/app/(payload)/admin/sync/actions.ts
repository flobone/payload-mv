'use server'

import config from '@payload-config'
import { getPayload } from 'payload'
import { revalidatePath } from 'next/cache'

import { syncCalendars } from '@/utilities/calendar-sync'

export type SyncActionState = {
  ok?: boolean
  error?: string
  summary?: string
}

export async function triggerCalendarSync(): Promise<SyncActionState> {
  try {
    const payload = await getPayload({ config })
    const result = await syncCalendars(payload)

    revalidatePath('/admin/sync')

    const imported = result.sources.reduce((sum, source) => sum + source.imported, 0)
    const hidden = result.sources.reduce((sum, source) => sum + source.hidden, 0)

    return {
      ok: true,
      summary: `Synchronisation abgeschlossen. Importiert: ${imported}, ausgeblendet: ${hidden}.`,
    }
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Unbekannter Fehler beim Kalendersync.',
    }
  }
}