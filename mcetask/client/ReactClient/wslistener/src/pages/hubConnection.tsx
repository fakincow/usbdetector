
import io from 'socket.io-client';
import { useEffect, useState } from "react";
import { Manager } from "socket.io-client";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { DeviceCard } from "../components/DeviceCard";
import { FileSystemNavigator } from "../components/InputNavigator";
import { ITreeCategory } from "../models/models";
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
    const [devices, setDevices] = useState([]);
    const [tree, setTree] = useState(new Map());

    const createCategorys = (data) => {
        let types = new Map();
        if (!data) return;
        data.forEach(element => {
            if (types[element['deviceName']]) {
                let children = types[element['deviceName']];
                children.push(element)
            } else {
                let children = [element];
                types[element['deviceName']] = children;
            }
        });

        console.log('types', types);
        setTree(types)
    }
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
            console.log('hmmm', data);
            setLastPong(new Date().toISOString());
        });
        socket.on("products", (data) => {
            console.log('list of products', data);
            createCategorys(data)
            setDevices(data);
        });
    }
    useEffect(() => {
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

            <div className="bg-gray-100 w-4/6">
                <ul>
                    <p className="text-lg font-bold bg-green-100">Connected: {'' + isConnected}</p>
                    {devices.map((item, index) => {
                        return <DeviceCard device={item} key={index} />
                    })}
                </ul>
            </div>
            <div className="bg-gray-200 w-2/6">
                <ul>
                    tree of devices
                    <FileSystemNavigator tree={tree} />
                </ul>
            </div>
        </div>
    );
}
