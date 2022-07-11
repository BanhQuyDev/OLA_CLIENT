import React, { Suspense } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'
import { PrivateRouteAdmin, PrivateRouteStudent, PrivateRouteTeacher } from 'src/utilities/PrivateRoute'

// routes config
import routes from '../routes'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = () => {
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              {/* return route.component && ( */ }
              if (route.type === 'admin') {
                return (
                  <PrivateRouteAdmin
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                  >
                    <CFade>
                      <route.component />
                    </CFade>
                  </PrivateRouteAdmin>
                )
              }
              if (route.type === 'teacher') {
                return (
                  <PrivateRouteTeacher
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                  >
                    <CFade>
                      <route.component />
                    </CFade>
                  </PrivateRouteTeacher>
                )
              }
              if (route.type === 'student') {
                return (
                  <PrivateRouteStudent
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                  >
                    <CFade>
                      <route.component />
                    </CFade>
                  </PrivateRouteStudent>
                )
              }
              return (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                    <CFade>
                      <route.component {...props} />
                    </CFade>
                  )} />
              )
            })}
            <Redirect from="/" to="/mainPage" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
