// import React, { useRef, useState, useEffect } from 'react';
// import socket from '../../utilities/socket'
// import { makeStyles } from '@material-ui/core/styles';
// // import io from 'socket.io-client';
// // const socket = io('/');


// const useStyles = makeStyles((theme) => ({
//   //div
//   mainContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//   },

//   //div
//   row: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     marginTop: '15px',
//     lineHeight: '35px',
//   },

//   //label
//   label: {
//   },

//   //input
//   input: {
//     width: '150px',
//     height: '35px',
//     marginleft: '15px',
//     paddingLeft: '10px',
//     outline: 'none',
//     border: 'none',
//     borderRadius: '5px',
//   },

//   //div
//   error: {
//     marginTop: '10px',
//     fontSize: '20px',
//     color: '#e85a71',
//   },

//   //button
//   joinButton: {
//     height: '40px',
//     marginTop: '35px',
//     outline: 'none',
//     border: 'none',
//     borderRadius: '15px',
//     color: '#d8e9ef',
//     backgroundColor: '#4ea1d3',
//     fontSize: '25px',
//     fontWeight: 500,
//     '&:hover': {
//       backgroundColor: '#7bb1d1',
//       cursor: 'pointer',
//     },
//   }
// }))

// const Main = (props) => {
//   const classes = useStyles()
//   const roomRef = useRef();
//   const userRef = useRef();
//   const [err, setErr] = useState(false);
//   const [errMsg, setErrMsg] = useState('');

//   useEffect(() => {
//     console.log('hello')
//   }, []);
//   useEffect(() => {
//     socket.on('FE-error-user-exist', ({ error }) => {
//       if (!error) {
//         const roomName = roomRef.current.value;
//         const userName = userRef.current.value;

//         sessionStorage.setItem('user', userName);
//         props.history.push(`/room/${roomName}`);
//       } else {
//         setErr(error);
//         setErrMsg('User name already exist');
//       }
//     });
//   }, [props.history]);

//   function clickJoin() {
//     const roomName = roomRef.current.value;
//     const userName = userRef.current.value;

//     if (!roomName || !userName) {
//       setErr(true);
//       setErrMsg('Enter Room Name or User Name');
//     } else {
//       socket.emit('BE-check-user', { roomId: roomName, userName });
//     }
//   }

//   return (
//     <div className={classes.mainContainer}>
//       <div className={classes.row}>
//         <label htmlFor="roomName">Room Name</label>
//         <input className={classes.input} type="text" id="roomName" ref={roomRef} />
//       </div>
//       <div className={classes.row}>
//         <label htmlFor="userName">User Name</label>
//         <input className={classes.input} type="text" id="userName" ref={userRef} />
//       </div>
//       <button className={classes.joinButton} onClick={clickJoin}> Join </button>
//       {err ? <div className={classes.error}>{errMsg}</div> : null}
//     </div>
//   );
// };

// // const MainContainer = styled.div`
// //   display: flex;
// //   flex-direction: column;
// // `;

// // const Row = styled.div`
// //   display: flex;
// //   align-items: center;
// //   justify-content: flex-end;
// //   margin-top: 15px;
// //   line-height: 35px;
// // `;

// // const Label = styled.label``;

// // const Input = styled.input`
// //   width: 150px;
// //   height: 35px;
// //   margin-left: 15px;
// //   padding-left: 10px;
// //   outline: none;
// //   border: none;
// //   border-radius: 5px;
// // `;

// // const Error = styled.div`
// //   margin-top: 10px;
// //   font-size: 20px;
// //   color: #e85a71;
// // `;

// // const JoinButton = styled.button`
// //   height: 40px;
// //   margin-top: 35px;
// //   outline: none;
// //   border: none;
// //   border-radius: 15px;
// //   color: #d8e9ef;
// //   background-color: #4ea1d3;
// //   font-size: 25px;
// //   font-weight: 500;

// //   :hover {
// //     background-color: #7bb1d1;
// //     cursor: pointer;
// //   }
// // `;

// export default Main;
