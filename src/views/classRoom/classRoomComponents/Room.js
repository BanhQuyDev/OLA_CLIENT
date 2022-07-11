import React, { useState, useEffect, useRef, useCallback } from 'react';
import Peer from 'simple-peer';
import styled from 'styled-components';
import socket from 'src/utilities/socket';
import VideoCard from './VideoCard';
import Chat from './Chat';
import { useHistory, useParams } from 'react-router-dom';
// import io from 'socket.io-client';
// const socket = io('/');

import { makeStyles } from '@material-ui/core/styles';
import { useAuthContext } from 'src/context/AuthContext';

const useStyles = makeStyles((theme) => ({
  width0: {
    width: '0% !important',
  },
  widthPeer0: {
    width: '25% !important',
  },

  widthPeer1: {
    width: '75% !important',
  },
  widthPeer2: {
    width: '30% !important',
  },
  widthPeer3: {
    width: '28% !important',
  },
  widthPeer4: {
    width: '28% !important',
  },
  widthPeer5: {
    width: '28% !important',
  },
  widthPeer6: {
    width: '25% !important',
  },

  widthPeer7: {
    width: '25% !important',
  },
  widthPeer8: {
    width: '25% !important',
  },
  widthPeer: {
    width: '20% !important',
  },
}));

const configServer = {
  iceServers: [
    { url: 'stun:stun.l.google.com:19302' },
    {
      urls: "stun:openrelay.metered.ca:80",
    },
    {
      urls: "turn:20.24.87.236:3478",
      username: "admin",
      credential: "admin"
    },
    {
      urls: "turn:18.212.69.56:3478?transport=tcp",
      username: "username1",
      credential: "password1"
    },
    {
      urls: "turn:openrelay.metered.ca:80?transport=tcp",
      username: "openrelayproject",
      credential: "openrelayproject",
    },
    {
      urls: "turn:openrelay.metered.ca:443",
      username: "openrelayproject",
      credential: "openrelayproject",
    },
    // {
    //   urls: "turn:openrelay.metered.ca:443?transport=tcp",
    //   username: "openrelayproject",
    //   credential: "openrelayproject",
    // },
  ]
}

const Room = (props) => {
  const auth = useAuthContext()
  const currentUserLogin = JSON.parse(auth.user)
  const classes = useStyles()
  const history = useHistory()
  const [peers, setPeers] = useState([]);
  const [userVideoAudio, setUserVideoAudio] = useState({
    localUser: { video: true, audio: true },
  });
  const [videoDevices, setVideoDevices] = useState([]);
  const [displayChat, setDisplayChat] = useState(false);
  const [screenShare, setScreenShare] = useState(false);
  const [showVideoDevices, setShowVideoDevices] = useState(false);
  const peersRef = useRef([]);
  const userVideoRef = useRef();
  const screenTrackRef = useRef();
  const userStream = useRef();
  const params = useParams()
  const roomId = params.roomId;
  const currentUser = params.userName
  const teacherId = params.teacherId


  useEffect(() => {
    console.log(params)
    // Get Video Devices
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const filtered = devices.filter((device) => device.kind === 'videoinput');
      setVideoDevices(filtered);
    });

    // Set Back Button Event
    window.addEventListener('popstate', (e) => goToBack(e));

    // Connect Camera & Mic
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideoRef.current.srcObject = stream;
        userStream.current = stream;

        socket.emit('BE-join-room', { roomId, userName: currentUser });
        socket.on('FE-user-join', (users) => {
          // all users
          const peers = [];
          users.forEach(({ userId, info }) => {
            let { userName, video, audio } = info;

            if (userName !== currentUser) {
              const peer = createPeer(userId, socket.id, stream);

              peer.userName = userName;
              peer.peerID = userId;

              peersRef.current.push({
                peerID: userId,
                peer,
                userName,
              });
              peers.push(peer);

              setUserVideoAudio((preList) => {
                return {
                  ...preList,
                  [peer.userName]: { video, audio },
                };
              });
            }
          });

          setPeers(peers);
        });

        socket.on('FE-receive-call', ({ signal, from, info }) => {
          let { userName, video, audio } = info;
          const peerIdx = findPeer(from);

          if (!peerIdx) {
            const peer = addPeer(signal, from, stream);

            peer.userName = userName;

            peersRef.current.push({
              peerID: from,
              peer,
              userName: userName,
            });
            setPeers((users) => {
              return [...users, peer];
            });
            setUserVideoAudio((preList) => {
              return {
                ...preList,
                [peer.userName]: { video, audio },
              };
            });
          }
        });

        socket.on('FE-call-accepted', ({ signal, answerId }) => {
          const peerIdx = findPeer(answerId);
          peerIdx.peer.signal(signal);
        });

        socket.on('FE-user-leave', ({ userId, userName }) => {
          // const peerIdx = findPeer(userId);
          // peerIdx.peer.destroy();
          // const newUsers = peers.filter((user) => user.peerID !== peerIdx.peer.peerID);
          // console.log([...newUsers])
          // // setPeers((users) => {
          // //   console.log(users)
          // //   users = users.filter((user) => user.peerID !== peerIdx.peer.peerID);
          // //   return [...users];
          // // });
          // setPeers([...newUsers])
          // peersRef.current = peersRef.current.filter(({ peerID }) => peerID !== userId);
          peersRef.current.forEach(p => {
            p.peer.destroy()
          })
          // history.push(`/feedback/teacher/${teacherId}`)
          history.push(`/afterClass`)
        });
      });

    socket.on('FE-toggle-camera', ({ userId, switchTarget }) => {
      const peerIdx = findPeer(userId);

      setUserVideoAudio((preList) => {
        let video = preList[peerIdx.userName].video;
        let audio = preList[peerIdx.userName].audio;

        if (switchTarget === 'video') video = !video;
        else audio = !audio;

        return {
          ...preList,
          [peerIdx.userName]: { video, audio },
        };
      });
    });

    // socket.on('testEmit', (test) => {
    //   console.log(test)
    //   history.push('/mainPage')
    // })
    // window.addEventListener("beforeunload", goToBack)

    return () => {
      // window.removeEventListener("beforeunload", goToBack)
      // console.log('here')
      // socket.emit('test', {
      //   test: 'test1'
      // });
      socket.disconnect();
    };
    // eslint-disable-next-line
  }, []);

  function createPeer(userId, caller, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
      config: configServer
    });

    peer.on('signal', (signal) => {
      socket.emit('BE-call-user', {
        userToCall: userId,
        from: caller,
        signal,
      });
    });
    peer.on('disconnect', () => {
      peer.destroy();
    });

    return peer;
  }

  function addPeer(incomingSignal, callerId, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
      config: configServer
    });

    peer.on('signal', (signal) => {
      socket.emit('BE-accept-call', { signal, to: callerId });
    });

    peer.on('disconnect', () => {
      peer.destroy();
    });

    peer.signal(incomingSignal);

    return peer;
  }

  function findPeer(id) {
    console.log(peersRef.current)
    return peersRef.current.find((p) => p.peerID === id);
  }

  function createUserVideo(peer, index, arr) {
    return (
      <VideoBox
        // className={classes[`widthPeer${peers.length > 8 ? '' : peers.length}`]}
        className={classes[`widthPeer1`]}
        onClick={expandScreen}
        key={index}
      >
        {writeUserName(peer.userName)}
        <FaIcon className='fas fa-expand' />
        <VideoCard key={index} peer={peer} number={arr.length} />
      </VideoBox>
    );
  }

  function writeUserName(userName, index) {
    if (userVideoAudio.hasOwnProperty(userName)) {
      if (!userVideoAudio[userName].video) {
        return <UserName key={userName}>{userName}</UserName>;
      }
    }
  }

  // Open Chat
  const clickChat = (e) => {
    e.stopPropagation();
    setDisplayChat(!displayChat);
  };

  // BackButton
  const goToBack = (e) => {
    console.log(e)
    e.preventDefault();
    console.log('toHere')
    socket.emit('BE-leave-room', { roomId, leaver: currentUser });
    // sessionStorage.removeItem('user');
    // window.location.href = '/';
    //TODO DOES THIS NEED TO BE REMOVED ?
    // history.push(`/feedback/teacher/${teacherId}`)
    history.push(`/afterClass`)
  };

  const toggleCameraAudio = (e) => {
    const target = e.target.getAttribute('data-switch');

    setUserVideoAudio((preList) => {
      let videoSwitch = preList['localUser'].video;
      let audioSwitch = preList['localUser'].audio;

      if (target === 'video') {
        const userVideoTrack = userVideoRef.current.srcObject.getVideoTracks()[0];
        videoSwitch = !videoSwitch;
        userVideoTrack.enabled = videoSwitch;
      } else {
        const userAudioTrack = userVideoRef.current.srcObject.getAudioTracks()[0];
        audioSwitch = !audioSwitch;

        if (userAudioTrack) {
          userAudioTrack.enabled = audioSwitch;
        } else {
          userStream.current.getAudioTracks()[0].enabled = audioSwitch;
        }
      }

      return {
        ...preList,
        localUser: { video: videoSwitch, audio: audioSwitch },
      };
    });

    socket.emit('BE-toggle-camera-audio', { roomId, switchTarget: target });
  };

  const clickScreenSharing = () => {
    if (!screenShare) {
      navigator.mediaDevices
        .getDisplayMedia({ cursor: true })
        .then((stream) => {
          const screenTrack = stream.getTracks()[0];

          peersRef.current.forEach(({ peer }) => {
            // replaceTrack (oldTrack, newTrack, oldStream);
            peer.replaceTrack(
              peer.streams[0]
                .getTracks()
                .find((track) => track.kind === 'video'),
              screenTrack,
              userStream.current
            );
          });

          // Listen click end
          screenTrack.onended = () => {
            peersRef.current.forEach(({ peer }) => {
              peer.replaceTrack(
                screenTrack,
                peer.streams[0]
                  .getTracks()
                  .find((track) => track.kind === 'video'),
                userStream.current
              );
            });
            userVideoRef.current.srcObject = userStream.current;
            setScreenShare(false);
          };

          userVideoRef.current.srcObject = stream;
          screenTrackRef.current = screenTrack;
          setScreenShare(true);
        });
    } else {
      screenTrackRef.current.onended();
    }
  };

  const expandScreen = (e) => {
    const elem = e.target;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  };

  const clickBackground = () => {
    if (!showVideoDevices) return;

    setShowVideoDevices(false);
  };

  const clickCameraDevice = (event) => {
    if (event && event.target && event.target.dataset && event.target.dataset.value) {
      const deviceId = event.target.dataset.value;
      const enabledAudio = userVideoRef.current.srcObject.getAudioTracks()[0].enabled;

      navigator.mediaDevices
        .getUserMedia({ video: { deviceId }, audio: enabledAudio })
        .then((stream) => {
          const newStreamTrack = stream.getTracks().find((track) => track.kind === 'video');
          const oldStreamTrack = userStream.current
            .getTracks()
            .find((track) => track.kind === 'video');

          userStream.current.removeTrack(oldStreamTrack);
          userStream.current.addTrack(newStreamTrack);

          peersRef.current.forEach(({ peer }) => {
            // replaceTrack (oldTrack, newTrack, oldStream);
            peer.replaceTrack(
              oldStreamTrack,
              newStreamTrack,
              userStream.current
            );
          });
        });
    }
  };

  // const handleToggle = useCallback(
  //   (e) => {
  //     setShowVideoDevices((state) => !state);
  //   },
  //   [setShowVideoDevices]
  // );

  return (
    <BigContainer>
      <RoomContainer onClick={clickBackground}>
        <VideoAndBarContainer>
          <VideoContainer>

            {/* Current User Video */}
            <VideoBox
              // className={`widthPeer${peers.length > 8 ? '' : peers.length}`}
              className={classes[`widthPeer0`]}
            >
              {userVideoAudio['localUser'].video ? null : (
                <UserName>{currentUser}</UserName>
              )}
              <FaIcon className='fas fa-expand' />
              <MyVideo
                onClick={expandScreen}
                ref={userVideoRef}
                muted
                autoPlay
                playInline
              ></MyVideo>
            </VideoBox>

            {/* Joined User Vidoe */}
            {peers &&
              peers.map((peer, index, arr) => createUserVideo(peer, index, arr))}
          </VideoContainer>

          <Bar>
            <Left>
              <CameraButton onClick={toggleCameraAudio} data-switch='video'>
                <div>
                  {userVideoAudio['localUser'].video ? (
                    <FaIcon1 className='fas fa-video'></FaIcon1>
                  ) : (
                    <FaIcon1 className='fas fa-video-slash'></FaIcon1>
                  )}
                </div>
                Camera
              </CameraButton>
              {showVideoDevices && (
                <SwitchList>
                  {videoDevices.length > 0 &&
                    videoDevices.map((device) => {
                      return <div key={device.deviceId} onClick={clickCameraDevice} data-value={device.deviceId} >{device.label}</div>;
                    })}
                  {/* <div>Switch Camera</div> */}
                </SwitchList>
              )}
              {/* <SwitchMenu onClick={handleToggle}>
                <i className='fas fa-angle-up'></i>
              </SwitchMenu> */}
              <CameraButton onClick={toggleCameraAudio} data-switch='audio'>
                <div>
                  {userVideoAudio['localUser'].audio ? (
                    <FaIcon1 className='fas fa-microphone'></FaIcon1>
                  ) : (
                    <FaIcon1 className='fas fa-microphone-slash'></FaIcon1>
                  )}
                </div>
                Audio
              </CameraButton>
            </Left>
            <LeftFlex>
              <ChatButton onClick={clickChat}>
                <div>
                  <FaIcon1 className='fas fa-comments'></FaIcon1>
                </div>
                Chat
              </ChatButton>
              <ScreenButton onClick={clickScreenSharing}>
                <div>
                  <FaIcon1
                    className={`fas fa-desktop ${screenShare ? 'sharing' : ''}`}
                  ></FaIcon1>
                </div>
                Share Screen
              </ScreenButton>
            </LeftFlex>
            <Right>
              <StopButton onClick={(e) => goToBack(e)}>Stop</StopButton>
            </Right>
          </Bar>

        </VideoAndBarContainer>
        <Chat display={displayChat} roomId={roomId} />
      </RoomContainer>
    </BigContainer>
  );
};

const BigContainer = styled.div`
  text-align: center;
  background-color: #454552;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  `

const RoomContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  flex-direction: row;
`;

const VideoContainer = styled.div`
  max-width: 100%;
  height: 92%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
  padding: 15px;
  box-sizing: border-box;
  gap: 10px;
`;

const VideoAndBarContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding-bottom: 60px;
  background-color: lavender;
`;

const MyVideo = styled.video`
`;

const VideoBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2.5em 2.5em -1.875em rgba(0, 0, 0, .5), 0 1.25em 5em 1em rgba(0, 0, 0, .2);
  > video {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  :hover {
    > i {
      display: block;
    }
  }
`;

const UserName = styled.div`
  position: absolute;
  font-size: calc(20px + 5vmin);
  z-index: 1;
`;

const FaIcon = styled.i`
  display: none;
  position: absolute;
  right: 15px;
  top: 15px;
`;



////////////////////////////////////

const Bar = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  ${'' /* background-color: #4ea1d3; */}
  background-color: #5ca9fb;
  background-image: linear-gradient(to right, #5ca9fb 0%, #6372ff 100%);
`;
const Left = styled.div`
  display: flex;
  align-items: center;

  margin-left: 15px;
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const LeftFlex = styled.div`
  flex: 1;
  display: flex;
  justify-content: start;
`;

const Right = styled.div``;

const ChatButton = styled.div`
  width: 75px;
  border: none;
  font-size: 0.9375rem;
  padding: 5px;

  :hover {
    background-color: #77b7dd;
    cursor: pointer;
    ${'' /* border-radius: 15px; */}
  }

  * {
    pointer-events: none;
  }
`;

const ScreenButton = styled.div`
  width: auto;
  border: none;
  font-size: 0.9375rem;
  padding: 5px;

  :hover {
    background-color: #77b7dd;
    cursor: pointer;
    ${'' /* border-radius: 15px; */}
  }

  .sharing {
    color: #ee2560;
  }
`;

const FaIcon1 = styled.i`
  width: 20px;
  font-size: calc(10px + 1vmin);
`;

const StopButton = styled.div`
  width: 75px;
  height: 30px;
  border: none;
  font-size: 0.9375rem;
  line-height: 30px;
  margin-right: 15px;
  background-color: #ee2560;
  border-radius: 15px;

  :hover {
    background-color: #f25483;
    cursor: pointer;
  }
`;

const CameraButton = styled.div`
  position: relative;
  width: 75px;
  border: none;
  font-size: 0.9375rem;
  padding: 5px;

  :hover {
    background-color: #77b7dd;
    cursor: pointer;
    ${'' /* border-radius: 15px; */}
  }

  * {
    pointer-events: none;
  }

  .fa-microphone-slash {
    color: #ee2560;
  }

  .fa-video-slash {
    color: #ee2560;
  }
`;

// const SwitchMenu = styled.div`
//   display: flex;
//   position: absolute;
//   width: 20px;
//   top: 7px;
//   left: 80px;
//   z-index: 1;

//   :hover {
//     background-color: #476d84;
//     cursor: pointer;
//     border-radius: 15px;
//   }

//   * {
//     pointer-events: none;
//   }

//   > i {
//     width: 90%;
//     font-size: calc(10px + 1vmin);
//   }
// `;

const SwitchList = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: -65.95px;
  left: 80px;
  background-color: #4ea1d3;
  color: white;
  padding-top: 5px;
  padding-right: 10px;
  padding-bottom: 5px;
  padding-left: 10px;
  text-align: left;

  > div {
    font-size: 0.85rem;
    padding: 1px;
    margin-bottom: 5px;

    :not(:last-child):hover {
      background-color: #77b7dd;
      cursor: pointer;
    }
  }

  > div:last-child {
    border-top: 1px solid white;
    cursor: context-menu !important;
  }
`;

export default Room;