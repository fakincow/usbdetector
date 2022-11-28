const usbDetect = require('usb-detection');
const { Server } = require("socket.io"),
server = new Server(9000);
usbDetect.startMonitoring();
let listOfDevices = [];
usbDetect.find().then(function (devices) { 
    console.log(devices); 
    listOfDevices = devices;
}).catch(function (err) { console.log(err); });
usbDetect.on('add', function (device) { console.log('add>>', device); });

let sequenceNumberByClient = new Map();

// event fired every time a new client connects:
server.on("connection", (socket) => {
    console.info(`Client connected [id=${socket.id}]`);
    // initialize this client's sequence number
    sequenceNumberByClient.set(socket, 1);
     sendDataOnConnect();
    // when socket disconnects, remove it from the list:
    socket.on("disconnect", () => {
        sequenceNumberByClient.delete(socket);
        console.info(`Client gone [id=${socket.id}]`);
    });
});
function sendDataOnConnect(){
    for (const [client, sequenceNumber] of sequenceNumberByClient.entries()) {
        client.emit("products",listOfDevices);
        sequenceNumberByClient.set(client, sequenceNumber + 1);
    }
}
// sends each client its current sequence number
setInterval(() => {
    for (const [client, sequenceNumber] of sequenceNumberByClient.entries()) {
        client.emit("products",listOfDevices);
        sequenceNumberByClient.set(client, sequenceNumber + 1);
    }
}, 10000);
