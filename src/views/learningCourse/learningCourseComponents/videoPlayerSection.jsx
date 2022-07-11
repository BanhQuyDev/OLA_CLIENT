import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ReactPlayer from 'react-player'
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';

const useStyles = makeStyles((theme) => ({
    rootVideo: {
        display: 'flex',
        flexDirection: 'column',
    },
    reactPlayer: {
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    controlButtons: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    eachButton: {
        margin: '0 5px'
    }
}))


let VideoPlayerSection = (props) => {
    const classes = useStyles()
    const videoRef = React.createRef()
    const [url, setUrl] = useState('')
    const [pip, setPip] = useState(false)
    const [playing, setPlaying] = useState(false)
    const [volume, setVolume] = useState(0.8)
    const [muted, setMuted] = useState(false)
    const [played, setPlayed] = useState(0)
    const [loaded, setLoaded] = useState(0)
    const [duration, setDuration] = useState(0)
    const [playbackRate, setPlaybackRate] = useState(1.0)
    const [seeking, setSeeking] = useState(false)

    useEffect(() => {
        setUrl(props.url)
    }, [props.url]);

    const handlePlayPause = () => {
        setPlaying(!playing)
    }

    const handleVolumeChange = e => {
        setVolume(parseFloat(e.target.value))
    }

    const handleToggleMuted = () => {
        setMuted(!muted)
    }

    const handleSetPlaybackRate = e => {
        setPlaybackRate(parseFloat(e.target.value))
    }

    const handleOnPlaybackRateChange = (speed) => {
        setPlaybackRate(parseFloat(speed))
    }

    const handleTogglePIP = () => {
        setPip(!pip)
    }

    const handlePlay = () => {
        setPlaying(true)
    }

    const handleEnablePIP = () => {
        setPip(true)
    }

    const handleDisablePIP = () => {
        setPip(false)
    }

    const handlePause = () => {
        setPlaying(false)
    }

    // const handleSeekMouseDown = e => {
    //     setSeeking(true)
    // }

    const handleSeekChange = e => {
        setPlayed(parseFloat(e.target.value))
        videoRef.current.seekTo(parseFloat(e.target.value))
    }

    // const handleSeekMouseUp = e => {
    //     setSeeking(false)
    //     videoRef.current.seekTo(parseFloat(e.target.value))
    // }

    const handleProgress = state => {
        // console.log('onProgress', state)
        // We only want to update time slider if we are not currently seeking
        if (!seeking) {
            setPlayed(state.played)
            setLoaded(state.loaded)
            // this.setState(state)
        }
    }

    const handleEnded = () => {
        props.handleUnitDone(props.currentUnit.id)
    }

    const handleDuration = (durationParam) => {
        setDuration(durationParam)
    }

    // const handleClickFullscreen = () => {
    //     screenfull.request(findDOMNode(videoRef))
    // }

    return (
        <div className={`${classes.rootVideo}`}>
            <div className={`${classes.reactPlayer}`}>
                <ReactPlayer
                    ref={videoRef}
                    width='100%'
                    height='100%'
                    url={url}
                    pip={pip}
                    playing={playing}
                    playbackRate={playbackRate}
                    volume={volume}
                    muted={muted}
                    // onReady={() => console.log('onReady')}
                    // onStart={() => console.log('onStart')}
                    onPlay={() => handlePlay()}
                    onEnablePIP={() => handleEnablePIP()}
                    onDisablePIP={() => handleDisablePIP()}
                    onPause={() => handlePause()}
                    onBuffer={() => console.log('onBuffer')}
                    onPlaybackRateChange={(speed) => handleOnPlaybackRateChange(speed)}
                    onSeek={e => console.log('onSeek', e)}
                    onEnded={() => handleEnded()}
                    onError={e => console.log('onError', e)}
                    onProgress={(e) => handleProgress(e)}
                    onDuration={(e) => handleDuration(e)}
                />
                <div className={`${classes.controlButtons}`}>
                    <Button className={`${classes.eachButton}`} onClick={() => handlePlayPause()}>{playing ? 'Pause' : 'Play'}</Button>
                    {/* <Button onClick={() => handleClickFullscreen()}>Fullscreen</Button> */}
                    {ReactPlayer.canEnablePIP(url) &&
                        <Button onClick={() => handleTogglePIP()}>{pip ? 'Disable PiP' : 'Enable PiP'}</Button>}
                    <Button onClick={(e) => handleSetPlaybackRate(e)} value={1}>1x</Button>
                    <Button onClick={(e) => handleSetPlaybackRate(e)} value={1.5}>1.5x</Button>
                    <Button onClick={(e) => handleSetPlaybackRate(e)} value={2}>2x</Button>
                    <Button onClick={() => handleToggleMuted()}>{muted ? 'Unmute' : 'Mute'}</Button>
                </div>
                <div className={`${classes.controlButtons}`}>
                    {/* <div className={`${classes.timeLine}`}>
                            <Duration seconds={duration * played} />
                        </div> */}
                    <Duration seconds={duration * played} />
                    <span> / </span>
                    <Duration seconds={duration} />
                    <div style={{ marginLeft: '15px', width: '100%', display: 'flex', alignItems: 'center' }}>
                        <Slider
                            min={0}
                            max={0.999999}
                            step={0.01}
                            value={played}
                            size="small"
                            onChange={(e) => handleSeekChange(e)}
                        />
                    </div>
                </div>
            </div>

            {/* <table>
                        <tbody>
                            <tr>
                                <th>Controls</th>
                                <td>
                                    <Button className={`${classes.eachButton}`} onClick={() => handlePlayPause()}>{playing ? 'Pause' : 'Play'}</Button>
                                    <Button onClick={() => handleClickFullscreen()}>Fullscreen</Button>
                                    {ReactPlayer.canEnablePIP(url) &&
                                        <Button onClick={() => handleTogglePIP()}>{pip ? 'Disable PiP' : 'Enable PiP'}</Button>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <th>Speed</th>
                                <td>
                                    <Button onClick={(e) => handleSetPlaybackRate(e)} value={1}>1x</Button>
                                    <Button onClick={(e) => handleSetPlaybackRate(e)} value={1.5}>1.5x</Button>
                                    <Button onClick={(e) => handleSetPlaybackRate(e)} value={2}>2x</Button>
                                </td>
                            </tr>
                            <tr>
                                <th>Seek</th>
                                <td>
                                    <input
                                        type='range' min={0} max={0.999999} step='any'
                                        value={played}
                                        onMouseDown={(e) => handleSeekMouseDown(e)}
                                        onChange={(e) => handleSeekChange(e)}
                                        onMouseUp={(e) => handleSeekMouseUp(e)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>Volume</th>
                                <td>
                                    <input type='range' min={0} max={1} step='any' value={volume} onChange={(e) => handleVolumeChange(e)} />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label htmlFor='muted'>Muted</label>
                                </th>
                                <td>
                                    <input id='muted' type='checkbox' checked={muted} onChange={() => handleToggleMuted()} />
                                </td>
                            </tr>
                            <tr>
                                <th>Played</th>
                                <td><progress max={1} value={played} /></td>
                            </tr>
                            <tr>
                                <th>Loaded</th>
                                <td><progress max={1} value={loaded} /></td>
                            </tr>
                        </tbody>
                    </table> */}
            {/* <section className='section'>
                    <h2>State</h2>

                    <table>
                        <tbody>
                            <tr>
                                <th>url</th>
                                <td className={!url ? 'faded' : ''}>
                                    {(url instanceof Array ? 'Multiple' : url) || 'null'}
                                </td>
                            </tr>
                            <tr>
                                <th>playing</th>
                                <td>{playing ? 'true' : 'false'}</td>
                            </tr>
                            <tr>
                                <th>volume</th>
                                <td>{volume.toFixed(3)}</td>
                            </tr>
                            <tr>
                                <th>speed</th>
                                <td>{playbackRate}</td>
                            </tr>
                            <tr>
                                <th>played</th>
                                <td>{played.toFixed(3)}</td>
                            </tr>
                            <tr>
                                <th>loaded</th>
                                <td>{loaded.toFixed(3)}</td>
                            </tr>
                            <tr>
                                <th>duration</th>
                                <td><Duration seconds={duration} /></td>
                            </tr>
                            <tr>
                                <th>elapsed</th>
                                <td><Duration seconds={duration * played} /></td>
                            </tr>
                            <tr>
                                <th>remaining</th>
                                <td><Duration seconds={duration * (1 - played)} /></td>
                            </tr>
                        </tbody>
                    </table>
                </section> */}
        </div>
    )
}

// //un-use
// const ResponsivePlayer = (props) => {
//     const classes = useStyles()
//     return (
//         <div className={`${classes.playerWrapper}`}>
//             <ReactPlayer
//                 className={`${classes.reactPlayer}`}
//                 url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
//                 width='100%'
//                 height='100%'
//             />
//         </div>
//     )
// }

function Duration({ className, seconds }) {
    return (
        <time dateTime={`P${Math.round(seconds)}S`} className={className}>
            {format(seconds)}
        </time>
    )
}

function format(seconds) {
    const date = new Date(seconds * 1000)
    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes()
    const ss = pad(date.getUTCSeconds())
    if (hh) {
        return `${hh}:${pad(mm)}:${ss}`
    }
    return `${mm}:${ss}`
}

function pad(string) {
    return ('0' + string).slice(-2)
}


export default VideoPlayerSection