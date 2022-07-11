import React, { useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';

const RoomAfterClass = () => {
    const history = useHistory()

    useEffect(() => {
        reloadPageOneTime()
    }, [])

    const reloadPageOneTime = () => {
        const reloadCount = sessionStorage.getItem('reloadCount');
        if(Number(reloadCount) < 2) {
          sessionStorage.setItem('reloadCount', String(reloadCount + 1));
          window.location.reload();
        } else {
          sessionStorage.removeItem('reloadCount');
        }
      }
    
    return (
        <>
            <div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <p style={{ marginTop: '20px' }}>Happy Learning / Teaching !</p>
                    <Button
                        onClick={() => { history.push('/mainPage') }}
                        variant="outlined"
                    >Go To Main Page
                    </Button>
                </div>
            </div>
        </>
    )
}

export default RoomAfterClass
