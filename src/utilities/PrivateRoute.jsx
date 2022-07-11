
import React from 'react';
import { useAuthContext } from '../context/AuthContext'
import { Route, Redirect } from "react-router-dom";
import { useEffect } from 'react';

const TheLayout = React.lazy(() => import('../containers/TheLayout'));

export default function PrivateRoute({ children, ...props }) {
  const auth = useAuthContext();
  useEffect(()=>{
    console.log(auth)
    console.log(auth.isLoggedIn)
  }, [])
  return (
    <Route
      {...props}
      render={props => 
        auth.isLoggedIn ? (
          <TheLayout {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
      // render={({ location }) =>
      //   auth.isLoggedIn ? (
      //     children
      //   ) : (
      //     <Redirect
      //       to={{
      //         pathname: '/login',
      //         state: { from: location },
      //       }}
      //     />
      //   )
      // }
    />
  );
}


export function PrivateRouteAdmin({ children, ...props }) {
  const auth = useAuthContext();
  const currentUser = JSON.parse(auth.user)
  return (
    <Route
      {...props}
      render={props => 
        currentUser.role === 'admin' ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/mainPage',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export function PrivateRouteTeacher({ children, ...props }) {
  const auth = useAuthContext();
  const currentUser = JSON.parse(auth.user)
  return (
    <Route
      {...props}
      render={props => 
        currentUser.role === 'teacher' ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/mainPage',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export function PrivateRouteStudent({ children, ...props }) {
  const auth = useAuthContext();
  const currentUser = JSON.parse(auth.user)
  return (
    <Route
      {...props}
      render={props => 
        currentUser.role === 'student' ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/mainPage',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}
