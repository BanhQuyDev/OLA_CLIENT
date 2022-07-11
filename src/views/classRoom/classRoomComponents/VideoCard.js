import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
const VideoCard = (props) => {
  const ref = useRef();
  const peer = props.peer;

  useEffect(() => {
    peer.on('stream', (stream) => {
      ref.current.srcObject = stream;
    });
    peer.on('track', (track, stream) => {
    });
  }, [peer]);

  return (
    <Video
      playsInline
      autoPlay
      ref={ref}
    />
  );
};

const Video = styled.video`
 box-shadow: 0 2.5em 2.5em -1.875em rgba(0, 0, 0, .5), 0 1.25em 5em 1em rgba(0, 0, 0, .2);
`;

export default VideoCard;
