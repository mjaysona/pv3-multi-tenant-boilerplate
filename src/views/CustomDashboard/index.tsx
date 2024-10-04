import { DefaultTemplate } from '@payloadcms/next/templates'
import { AdminViewProps } from 'payload'
import React, { Fragment } from 'react'
import DashboardClient from './index.client'
import './index.scss'

const CustomDashboardView: React.FC<AdminViewProps> = async (props) => {
  const { initPageResult } = props
  const { permissions, req, visibleEntities } = initPageResult
  const { i18n, payload, user } = req
  const { canAccessAdmin } = permissions
  const { totalDocs } = await payload.count({ collection: 'users' })

  return (
    <Fragment>
      <DashboardClient user={user} canAccessAdmin={canAccessAdmin} />
      <DefaultTemplate payload={payload} i18n={i18n} visibleEntities={visibleEntities}>
        <div
          className="collection-list"
          style={{ paddingLeft: 'var(--gutter-h)', paddingRight: 'var(--gutter-h)' }}
        >
          <div className="dashboard">
            <div className="dashboard__wrap">
              <h1 className="dashboard__label">Dashboard</h1>
              <ul className="dashboard__card-list">
                <li>
                  <div className="card">
                    <h3 className="card__title">User count</h3>
                    <h3 className="card__value">{totalDocs}</h3>
                  </div>
                </li>
                <li>
                  <div className="card">
                    <h3 className="card__title">Sales</h3>
                    <h3 className="card__value">PHP 84,813.00</h3>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </DefaultTemplate>
    </Fragment>
  )
}

export default CustomDashboardView
