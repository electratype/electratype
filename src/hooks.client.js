import { browser } from '$app/environment';

export const socket = browser ? new WebSocket("ws://localhost:3669/ws") : null;

if (socket !== null) {
    
    socket.addEventListener("open", () => {
        console.log("Connection to Silvia Server established");
    });

    socket.addEventListener("message", (event) => {
        console.log(event);
    })
}