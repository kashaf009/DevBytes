import { Server } from "socket.io";

const initilizeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", (data) => {}   );

    socket.on("sendMessage", (data) => {});

    socket.on("disconnect", () => {});
  });
};

export default initilizeSocket;
