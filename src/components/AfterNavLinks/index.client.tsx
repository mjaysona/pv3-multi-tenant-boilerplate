'use client'

import { useConfig } from '@payloadcms/ui'
import Link from 'next/link'
import React from 'react'

const baseClass = 'after-nav-links nav-group'

const AfterNavLinksClient: React.FC = () => {
  const {
    config: {
      routes: { admin: adminRoute },
    },
  } = useConfig()

  return (
    <div
      className={baseClass}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'calc(var(--base) / 4)',
      }}
    >
      <div className="nav-group__toggle" style={{ color: 'var(--theme-elevation-400)', margin: 0 }}>
        Custom Routes
      </div>
      <div className="nav-group_content Custom Routes">
        <Link className="nav__link" href={`${adminRoute}/custom-default-view`}>
          Default Template
        </Link>
        <Link className="nav__link" href={`${adminRoute}/dashboard`}>
          Dashboard
        </Link>
        <Link href={`${adminRoute}/custom-standalone`}>Go to Custom Standalone View</Link>
        <Link href={`${adminRoute}/custom-minimal`}>Go to Custom Minimal View</Link>
      </div>
    </div>
  )
}

export default AfterNavLinksClient
