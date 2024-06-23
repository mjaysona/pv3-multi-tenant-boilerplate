'use client'

import React, { Fragment } from 'react'

import { useConfig } from '@payloadcms/ui/client'
import { redirect } from 'next/navigation'
import { SetStepNav } from '@payloadcms/ui/client'
import { InitPageResult } from 'payload'

type Props = {
  user: InitPageResult['req']['user']
  canAccessAdmin: boolean
}

const DashboardClient = ({ user, canAccessAdmin }: Props) => {
  const {
    routes: { admin: adminRoute },
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
