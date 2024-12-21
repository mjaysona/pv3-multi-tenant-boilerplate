'use client'

import React, { Fragment } from 'react'

import { SetStepNav, useConfig } from '@payloadcms/ui'
import { redirect } from 'next/navigation'
import { InitPageResult } from 'payload'

type Props = {
  user: InitPageResult['req']['user']
}

const DashboardClient = ({ user }: Props) => {
  const {
    config: {
      routes: { admin: adminRoute },
    },
  } = useConfig()

  const isSuperAdmin = user?.roles?.some(
    (role) => typeof role !== 'string' && role.value === 'superAdmin',
  )

  if (!user || (user && !isSuperAdmin)) {
    return redirect(`${adminRoute}/unauthorized`)
  }

  return (
    <Fragment>
      <SetStepNav nav={[{ label: 'Dashboard' }]} />
    </Fragment>
  )
}

export default DashboardClient
