// import App from "./App";
//
// var mqtt = require('mqtt');
//
// /*
//  * Connect to our broker
//  */
// var client = mqtt.connect('mqtt://100.68.110.18:9001');
//
// /*
//  * Topics we're going to be accessing
//  */
// var topicSubscriptions = ["requestAccess", "removeAccess", "checkAccess", "requestTempAccess"];
//
// /*
//  * Connect to our client and subscribe to all the different topics
//  */
// client.on('connect', function () {
//     client.subscribe(topicSubscriptions, function (err) {
//         if (err) {
//             console.log('ERROR: ' + err);
//             return;
//         }
//     });
//
//     var jsonReq = {
//         device: 1001,
//         room: 53
//     };
//
//     client.publish('requestAccess', JSON.stringify(jsonReq));
//     client.publish('requestAccess', JSON.stringify(jsonReq));
//     client.publish('requestAccess', JSON.stringify(jsonReq));
//     client.publish('requestAccess', JSON.stringify(jsonReq));
// });
//
// export function requestAccess(device, room) {
//     var success = false;
//     var jsonReq = {
//         device: device,
//         room: room
//     };
//
//     client.publish('requestAccess', JSON.stringify(jsonReq));
//
//     return success;
// }
//
// export function removeAccess(device, room) {
//     var success = false;
//     var jsonReq = {
//         device: device,
//         room: room
//     };
//
//     client.publish('removeAccess', JSON.stringify(jsonReq));
//
//     return success;
// }
//
// export function checkAccess(device) {
//     var success = false;
//     var jsonReq = {
//         device: device
//     };
//
//     client.publish('checkAccess', JSON.stringify(jsonReq));
//
//     return success;
// }
//
// export function requestTempAccess(device, room) {
//     var success = false;
//     var jsonReq = {
//         device: device,
//         room: room
//     };
//
//     client.publish('requestTempAccess', JSON.stringify(jsonReq));
//
//     return success;
// }
//
// client.on('message', function (topic, message) {
//     // show topic
//     console.log(topic);
//     // message assumed to be in JSON
//     console.log(message.toJSON());
// });
//
// export default mqtt;
