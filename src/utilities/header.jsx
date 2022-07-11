import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },

    appBar: {
        background: '-webkit - linear - gradient(to right, #5ca9fb 0%, #6372ff 100%)', /* Chrome 10-25, Safari 5.1-6 */
        background: 'linear-gradient(to right, #5ca9fb 0%, #6372ff 100%)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        fontWeight: 'thin',
        marginLeft: "2%",
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

function Header() {
    const classes = useStyles();
    const history = useHistory()

    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar} position="static">
                <Toolbar>
                    <Link href="/main" className={classes.title} variant="h6" noWrap>
                        OLA |<span className={classes.span}> EDU</span>
                    </Link>
                    <Button onClick={()=>history.push("/login")} className={classes.loginButton} type='button'>LOGIN</Button>
                    <Button onClick={()=>history.push("/register")} className={classes.registerButton} type='button'>REGISTER</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header
