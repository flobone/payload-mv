import React from 'react'
import './index.scss'

const baseClass = 'sync-nav-link'

export default function SyncNavLink() {
  return (
    <div className={baseClass}>
      <a className={`${baseClass}__link`} href="/admin/sync">
        Kalendersync
      </a>
      <p className={`${baseClass}__hint`}>
        Kalenderquellen synchronisieren und Status prüfen.
      </p>
    </div>
  )
}