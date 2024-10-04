'use client'

import React, { Fragment } from 'react'

import { SetStepNav, useConfig } from '@payloadcms/ui'
import { redirect } from 'next/navigation'
import { InitPageResult } from 'payload'

type Props = {
  user: InitPageResult['req']['user']
  canAccessAdmin: boolean
}

const DashboardClient = ({ user, canAccessAdmin }: Props) => {
  const {
    config: {
      routes: { admin: adminRoute },
    },
  } = useConfig()

  // If an unauthorized user tries to navigate straight to this page,
  // Boot 'em out
  if (!user || (user && !canAccessAdmin)) {
    return redirect(`${adminRoute}/unauthorized`)
  }

  return (
    <Fragment>
      <SetStepNav nav={[{ label: 'Dashboard' }]} />
    </Fragment>
  )
}

export default DashboardClient
