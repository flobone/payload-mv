'use client'

import { useActionState } from 'react'

import type { SyncActionState } from './actions'
import { triggerCalendarSync } from './actions'

const initialState: SyncActionState = {}

export function SyncPanel() {
  const [state, formAction, pending] = useActionState(triggerCalendarSync, initialState)

  return (
    <form action={formAction} className="space-y-4">
      <button
        className="btn btn--style-primary btn--size-medium"
        disabled={pending}
        type="submit"
      >
        {pending ? 'Synchronisation läuft …' : 'Kalendersync starten'}
      </button>

      {state?.summary ? (
        <div className="rounded border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800">
          {state.summary}
        </div>
      ) : null}

      {state?.error ? (
        <div className="rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
          {state.error}
        </div>
      ) : null}
    </form>
  )
}