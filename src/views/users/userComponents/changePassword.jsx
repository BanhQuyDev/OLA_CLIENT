import React, { useState, useRef } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import { userChangePassword } from 'src/services/user.services';
import { useAuthContext } from 'src/context/AuthContext';


const useStyles = makeStyles((theme) => ({
    root: {
        padding: '15px',
        display: 'flex',
        flexDirection: 'column'
    },
    changePwButton: {
        "&:focus": {
            outline: 'none',
            boxShadow: 'none'
        }
    },
}))

const ChangePassword = () => {
    const classes = useStyles();
    const auth = useAuthContext()
    const currentUser = JSON.parse(auth.user)
    const [changeMode, setChangeMode] = useState(false)
    let currentPwRef = useRef('')
    let newPwRef = useRef('')

    const showChangePw = () => {
        if (changeMode) {
            resetForm()
        } else {
            setChangeMode(true)
        }

    }

    const resetForm = () => {
        currentPwRef.current.value = ''
        newPwRef.current.value = ''
        setChangeMode(false)
    }

    const handleChangePw = async () => {
        if (currentPwRef.current.value !== newPwRef.current.value && currentPwRef.current.value && newPwRef.current.value) {
            const result = await userChangePassword(currentUser.id, currentPwRef.current.value, newPwRef.current.value)
            if (result.status === 200) {
                toast.success('Changed Password Successfully')
            } else {
                toast.error('Something wrong happened')
            }    
            resetForm()
        } else {
            toast.warn('New password cannot be the same as current password')
        }
    }

    return (
        <>
            <div className={classes.root}>
                <Grid alignItems="center" justifyContent="center" container spacing={4}>
                    <Grid item xs={12}>
                        <div>
                            <Button className={classes.changePwButton} onClick={() => showChangePw()} variant="outlined">
                                {changeMode ? 'HIDE' : 'CHANGE PASSWORD'}
                            </Button>
                        </div>
                    </Grid>
                    {
                        changeMode ?
                            (
                                <>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            id="current-pw"
                                            label="Current Password"
                                            variant="standard"
                                            required
                                            fullWidth
                                            inputRef={currentPwRef} />
                                    </Grid><Grid item xs={12} md={4}>
                                        <TextField
                                            id="new-pw"
                                            label="New Password"
                                            variant="standard"
                                            required
                                            fullWidth
                                            inputRef={newPwRef} />
                                    </Grid><Grid item xs={12} md={4}>
                                        <Button className={classes.changePwButton} onClick={() => handleChangePw()} variant="outlined">CHANGE</Button>
                                    </Grid>
                                </>
                            ) : null
                    }
                </Grid>
            </div>
        </>
    )
}

export default ChangePassword
