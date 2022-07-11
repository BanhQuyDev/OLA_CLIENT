import io from 'socket.io-client';
import { serverEndpoint } from './serverEndpoint';
// const sockets = io('http://localhost:3001', { autoConnect: true, forceNew: true });
const sockets = io(serverEndpoint+ '/', { transports: ["websocket"] });
export default sockets;
