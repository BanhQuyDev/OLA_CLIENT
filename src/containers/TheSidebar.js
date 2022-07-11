import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'
import { alpha, makeStyles } from '@material-ui/core/styles';

// import CIcon from '@coreui/icons-react'

// sidebar nav config
import _nav from './_nav'
import { useAuthContext } from 'src/context/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  appBar: {
    // alignItems: "center",
    // justifyContent: 'space-between',
    // backgroundColor: 'gray'
    background: '-webkit - linear - gradient(to right, #5ca9fb 0%, #6372ff 100%)', /* Chrome 10-25, Safari 5.1-6 */
    background: 'linear-gradient(to right, #5ca9fb 0%, #6372ff 100%)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    // backgroundImage: "linear-gradient(to right, #5ca9fb 0%, #6372ff 100%)"
  },
  title: {
    marginLeft: '25%',
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    // textAlign: 'center',
    fontFamily: 'Montserrat',
    fontWeight: 'thin',
    // marginLeft: "2%",
    cursor: "pointer",
    textDecoration: "none",
    color: "white",
    "&:hover": {
      textDecoration: "none",
      color: "white",
    }
  },
  span: {
    fontWeight: 'bold'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  loginButton: {
    color: 'white',
  },
  registerButton: {
    color: 'white',
  },
  logOutButton: {
    color: 'white',
  }
}));

const TheSidebar = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)
  const [navigation, setNavigation] = useState([])
  const auth = useAuthContext()

  useEffect(() => {
    if (auth.user) {
      let role;
      let userId;
      // console.log(typeof auth.user === 'string')
      if (typeof auth.user === 'string') {
        role = JSON.parse(auth.user).role
        userId = JSON.parse(auth.user).id
      } else {
        role = auth.user.role
        userId = auth.user.id
      }
      // console.log(cloneDeep(auth.user))  
      setNavigation(_nav(userId, role))
      // setNavigation([])
    } else {
      setNavigation([])
    }
  }, [auth.user])



  return (
    <CSidebar
      style={{
        // backgroundColor: 'white'
        background: "linear-gradient(to right, #5ca9fb 0%, #6372ff 10%)"
      }}
      show={show}
      onShowChange={(val) => dispatch({ type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none">
        {/* <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        /> */}
        <h4 className={classes.title} >
          OLA |<span className={classes.span}> EDU</span>
        </h4>
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
