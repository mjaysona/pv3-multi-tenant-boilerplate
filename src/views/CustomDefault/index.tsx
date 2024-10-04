import React from 'react'

import './index.scss'
import CustomDefaultViewClient from './index.client'
import { AdminViewProps } from 'payload'
import { DefaultTemplate } from '@payloadcms/next/templates'

const CustomDefaultView: React.FC<AdminViewProps> = (props) => {
  const { initPageResult } = props
  const { permissions, req, visibleEntities } = initPageResult
  const { i18n, payload, user } = req
  const { canAccessAdmin } = permissions

  return (
    <DefaultTemplate payload={payload} i18n={i18n} visibleEntities={visibleEntities}>
      <CustomDefaultViewClient user={user} canAccessAdmin={canAccessAdmin} />
    </DefaultTemplate>
  )
}

export default CustomDefaultView
