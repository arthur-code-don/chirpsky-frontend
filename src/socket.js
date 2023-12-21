import io from "socket.io-client"; 
let socket;

const connectSocket = (user_id) => {
  socket = io("https://localhost:3001", {
    query: `user_id=${user_id}`,
  });
} // -- our server will run on port 3001, so we connect to it from here

export {socket, connectSocket};