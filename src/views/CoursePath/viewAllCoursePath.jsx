import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { toast } from 'react-toastify';
import LinearProgress from '@mui/material/LinearProgress';
import { getAllCoursePath } from 'src/services/courses.services';
import { Chrono } from "react-chrono";

const useStyles = makeStyles((theme) => ({
    root: {
    },
    formPathSection: {
        // height: '1000px',
        padding: '50px',
        borderRadius: '10px',
        // border: '1px solid #ccc',
    },
}))

const ViewAllCoursePath = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false)
    const [paths, setPaths] = useState([])

    const getData = async () => {
        const { status, data } = await getAllCoursePath()
        if (status === 200) {
            let group = []
            data.coursePath.forEach((path, idx) => {
                const eachCoursePath = {
                    title: 'Suggested path ' + (idx + 1),
                    cardTitle: path.name,
                    url: window.location.origin + `#/viewCoursePath/${path.id}`,
                    cardDetailedText: path.desc,
                }
                group.push(eachCoursePath)
            })
            setPaths(group)
            setLoading(false)
        } else {
            toast.error('Something wrong happened')
        }
    }
    useEffect(() => {
        setLoading(true)
        getData()
    }, [])

    return (
        <>
            {
                loading ? (<LinearProgress sx={{ margin: '30px 0 30px 0' }} />) : null
            }
            <h2
                style={{
                    marginLeft: '15px',
                    marginTop: '50px',
                    fontWeight: "700",
                    fontFamily: "Raleway",
                    background: 'linear-gradient(to right, #5ca9fb 0%, #6372ff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}
            >
                Suggested Course Path
            </h2>
            <div className={`${classes.formPathSection}`}>
                {
                    paths.length > 0
                        ? (<Chrono disableAutoScrollOnClick={true} useReadMore items={paths} mode="HORIZONTAL" />)
                        : <p>No Suggested Course Path Available</p>
                }

            </div>
        </>
    )
}

export default ViewAllCoursePath
