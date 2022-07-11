import React, { Component } from 'react';
import { HashRouter, Route, Router, Switch } from 'react-router-dom';
import './scss/style.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './utilities/PrivateRoute';
import AuthContextProvider from './context/AuthContext';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));
const LandingPage = React.lazy(() => import('./views/Guest/landingPage'));
const AllCoursesGuestPage = React.lazy(() => import('./views/Guest/AllCoursesGuestPage'));
const CourseDetailGuestPage = React.lazy(() => import('./views/Guest/courseDetailGuest'));

class App extends Component {

  render() {
    return (
      <>
        <ToastContainer
          draggable
          closeOnClick
          pauseOnHover
          pauseOnFocusLoss
          rtl={false}
          autoClose={5000}
          position="top-right"
          newestOnTop={false}
          hideProgressBar
        />
        <AuthContextProvider>
          <HashRouter>
            <React.Suspense fallback={loading}>
              <Switch>
                <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
                <Route exact path="/register" name="Register Page" render={props => <Register {...props} />} />
                <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
                <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
                <Route exact path="/landingPage" name="Landing Page" render={props => <LandingPage {...props} />} />
                <Route exact path="/allCoursesGuest" name="All Courses Page" render={props => <AllCoursesGuestPage {...props} />} />
                <Route exact path="/courseDetailGuest/:id" name="Course Detail Page" render={props => <CourseDetailGuestPage {...props} />} />
                {/* <Route path="/" name="Home" render={props => <TheLayout {...props} />} /> */}
                <PrivateRoute path="/" name="Home" />
              </Switch>
            </React.Suspense>
          </HashRouter>
        </AuthContextProvider>
      </>
    );
  }
}

export default App;
