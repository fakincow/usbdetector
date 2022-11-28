
import { useAppSelector } from "../hooks/redux";
import io from 'socket.io-client';
import { useEffect, useState } from "react";
import { Manager } from "socket.io-client";
import { w3cwebsocket as W3CWebSocket } from "websocket";
var parser = require('socket.io-parser');
var encoder = new parser.Encoder();
var packet = {
  type: parser.EVENT,
  data: 'test-packet',
  id: 13
};
const manager = new Manager("http://localhost:9000", {
    autoConnect: false
});
//const socket = manager.socket("/");
const socket = io("http://localhost:9000");
export function HubConnection() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [lastPong, setLastPong] = useState('');
    const { favourites } = useAppSelector(state => state.github);
    const initSocket = () => {
        socket.on("data", () => { console.log('data >>>>') });
        socket.on('connect', () => {
            console.log('connected');
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        socket.on('pong', (data) => {
            console.log('hmmm',data);
            setLastPong(new Date().toISOString());
        });
        socket.on("products", (data) => {
            console.log('list of products',data);
          });
    }
    useEffect(() => {
        console.log('init');
       
        manager.open((err) => {
            if (err) {
                console.log('an error has occurred'); // an error has occurred
            } else {
                console.log('connection was successfully established');// the connection was successfully established
            }
        });
         initSocket()

        //return () => {
        //   socket.off('connect');
        //   socket.off('disconnect');
        //    socket.off('pong');
        //   };
    }, []);

    return (
        <div className='flex justify-center pt-10 mx-auto h-scrren w-screen'>
            <ul  >
                tee of devices
            </ul>
            <p>Connected: {'' + isConnected}</p>
        </div>
    );

}
