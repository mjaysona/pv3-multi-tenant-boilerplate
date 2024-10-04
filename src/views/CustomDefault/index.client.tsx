'use client'

import React from 'react'

import './index.scss'
import { Button, SetStepNav, useConfig } from '@payloadcms/ui'
import { redirect } from 'next/navigation'
import { InitPageResult } from 'payload'
import Link from 'next/link'

type Props = {
  user: InitPageResult['req']['user']
  canAccessAdmin: boolean
}

const CustomDefaultViewClient = ({ user, canAccessAdmin }: Props) => {
  const {
    config: {
      routes: { admin: adminRoute },
    },
  } = useConfig()

  // This effect will only run one time and will allow us
  // to set the step nav to display our custom route name

  // If an unauthorized user tries to navigate straight to this page,
  // Boot 'em out
  if (!user || (user && !canAccessAdmin)) {
    return redirect(`${adminRoute}/unauthorized`)
  }

  return (
    <div
      style={{
        paddingLeft: 'var(--gutter-h)',
        paddingRight: 'var(--gutter-h)',
      }}
    >
      <SetStepNav nav={[{ label: 'Custom Default' }]} />
      <div className="collection-list">
        <h1>Custom Default</h1>
        <p>
          Here is a custom default that was added in the Payload config. It uses the Default
          Template, so the sidebar is rendered.
        </p>
        <div>
          <Link href={`${adminRoute}`}>
            <Button>Go to Homepage</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CustomDefaultViewClient
