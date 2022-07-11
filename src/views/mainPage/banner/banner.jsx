import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../banner/banner.module.css'
import { useEffect, useState, useRef } from 'react';
// import { top3Post } from '../../../apiData/top3Post'
import { getTop3Courses } from 'src/services/courses.services';
import LinearProgress from '@mui/material/LinearProgress';
import Tooltip from '@mui/material/Tooltip';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '93vh',
        // backgroundColor: "gray",
        display: "flex",
        justifyContent: 'space-around',
        padding: '20px',
        alignItems: 'center',
        marginBottom: '50px',
    },
}));


export default function Banner() {
    const classes = useStyles();
    const [current, setCurrent] = useState(0)
    const [top3Posts, setTop3Post] = useState(undefined)
    const [loading, setLoading] = useState("true")

    const leftClick = () => {
        if (current === 0)
            setCurrent(2)
        else {
            setCurrent(current - 1)
        }
    }
    const rightClick = () => {
        if (current === 2)
            setCurrent(0)
        else {
            setCurrent(current + 1)
        }
    }

    // add jsdoc1 here
    useEffect(() => {
        // call API for posts here
        const get3Courses = async () => {
            const courses = await getTop3Courses()
            setTop3Post(courses)
        }
        get3Courses()
        setLoading("false")
    }, [])

    if (loading === "true" || !top3Posts) {
        return (
            <LinearProgress sx={{ margin: '30px 0 30px 0' }} />
        )
    }

    return (
        <div className={`${classes.root} ${styles.rootBody}`}>
            <div className={`${styles.intro}`}>
                <h5 style={{
                    fontWeight: "500",
                }}
                >WELCOME TO</h5>
                <h2 className={`${styles.OlaText}`}
                    style={{
                        fontWeight: "700",
                        background: 'linear-gradient(to right, #5ca9fb 0%, #6372ff 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >OLA EDUCATION</h2>
            </div>
            <div className={styles.carousel}>
                <div className={styles.carousel__nav}>
                    <span id="moveLeft" className={styles.carousel__arrow} onClick={() => leftClick()}>
                        <svg className={styles.carousel__icon} width="24" height="24" viewBox="0 0 24 24">
                            <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"></path>
                        </svg>
                    </span>
                    <span id="moveRight" className={styles.carousel__arrow} onClick={() => rightClick()} >
                        <svg className={styles.carousel__icon} width="24" height="24" viewBox="0 0 24 24">
                            <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
                        </svg>
                    </span>
                </div>
                <div className={`${styles.carousel_item} ${styles.carousel_item1} ${current === 0 ? styles.active : 'nonActive'}`}>
                    <div className={styles.carousel_item__image} style={{backgroundImage: `url("${top3Posts[0]?.image}")`}}></div>
                    <div className={styles.carousel_item__info}>
                        <div className={styles.carousel_item__container}>
                            <Tooltip title={top3Posts[0]?.name} >
                                <h1 className={styles.carousel_item__title}>{top3Posts[0]?.name}</h1>
                            </Tooltip>
                            <p className={styles.carousel_item__description} >{top3Posts[0]?.description.slice(0, 100)}</p>
                            <a href="#" className={styles.carousel_item__btn}>Check It Out</a>
                        </div>
                    </div>
                </div>
                <div className={`${styles.carousel_item} ${styles.carousel_item2} ${current === 1 ? styles.active : 'nonActive'}`}>
                    <div className={styles.carousel_item__image} style={{backgroundImage: `url("${top3Posts[1]?.image}")`}} ></div>
                    <div className={styles.carousel_item__info}>
                        <div className={styles.carousel_item__container}>
                            <Tooltip title={top3Posts[1]?.name} >
                                <h1 className={styles.carousel_item__title}>{top3Posts[1]?.name}</h1>
                            </Tooltip>
                            <p className={styles.carousel_item__description} >{top3Posts[1]?.description.slice(0, 100)}</p>
                            <a href="#" className={styles.carousel_item__btn}>Check It Out</a>
                        </div>
                    </div>
                </div>
                <div className={`${styles.carousel_item} ${styles.carousel_item3} ${current === 2 ? styles.active : 'nonActive'}`}>
                    <div className={styles.carousel_item__image} style={{backgroundImage: `url("${top3Posts[2]?.image}")`}} ></div>
                    <div className={styles.carousel_item__info}>
                        <div className={styles.carousel_item__container}>
                            <Tooltip title={top3Posts[2]?.name} >
                                <h1 className={styles.carousel_item__title}>{top3Posts[2]?.name}</h1>
                            </Tooltip>
                            <p className={styles.carousel_item__description} >{top3Posts[2]?.description.slice(0, 100)}</p>
                            <a href="#" className={styles.carousel_item__btn}>Check It Out</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    // }

}