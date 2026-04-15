import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex items-center gap-4 text-white">
      {navItems.map(({ link }, i) => {
        return (
          <div key={i} className="[&_a]:text-white [&_a]:no-underline [&_a:hover]:text-[#ff9900]">
            <CMSLink {...link} appearance="link" />
          </div>
        )
      })}
    </nav>
  )
}