import { Server } from "socket.io";

const initilizeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({firstName, loginUserId, targetUserId}) => {
      const roomId = [loginUserId, targetUserId].sort().join("_");
      console.log( firstName + " joined : " +roomId);
      
      socket.join(roomId);
    });

    socket.on("sendMessage", ({firstName,loginUserId,photoUrl,targetUserId,text}) => {
      const roomId = [loginUserId, targetUserId].sort().join("_");
      // console.log(firstName +" : "+ text);
      

      io.to(roomId).emit("messageRecieved",{firstName,text,photoUrl})


    });

    socket.on("disconnect", () => {});
  });
};

export default initilizeSocket;
