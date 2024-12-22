'use client'

import type { PayloadAdminBarProps } from 'payload-admin-bar'

import { useRouter } from 'next/navigation'
import { PayloadAdminBar } from 'payload-admin-bar'
import React, { useState } from 'react'

import classes from './index.module.scss'
import { Gutter } from '@payloadcms/ui'
import { getClientSideURL } from '@/utilities/getURL'

const collectionLabels = {
  pages: {
    plural: 'Pages',
    singular: 'Page',
  },
}

const Title: React.FC = () => <span>Dashboard</span>

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps
}> = (props) => {
  const { adminBarProps } = props || {}
  const [show, setShow] = useState(false)
  const collection = 'pages'
  const router = useRouter()

  const onAuthChange = React.useCallback((user) => {
    setShow(user?.id)
  }, [])

  return (
    <div className={[classes.adminBar, show && classes.show].filter(Boolean).join(' ')}>
      <Gutter className={classes.container}>
        <PayloadAdminBar
          {...adminBarProps}
          className="py-2 text-white"
          classNames={{
            controls: 'font-medium text-white',
            logo: 'text-white',
            user: 'text-white',
          }}
          cmsURL={getClientSideURL()}
          collection={collection}
          collectionLabels={{
            plural: collectionLabels[collection]?.plural || 'Pages',
            singular: collectionLabels[collection]?.singular || 'Page',
          }}
          logo={<Title />}
          onAuthChange={onAuthChange}
          onPreviewExit={() => {
            fetch('/next/exit-preview').then(() => {
              router.push('/')
              router.refresh()
            })
          }}
          style={{
            backgroundColor: 'transparent',
            padding: 0,
            position: 'relative',
            zIndex: 'unset',
          }}
        />
      </Gutter>
    </div>
  )
}
