import { Server } from "socket.io";
import chat from "../models/chat.js";

const initilizeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({firstName, loginUserId, targetUserId}) => {
      const roomId = [loginUserId, targetUserId].sort().join("_");
      // console.log( firstName + " joined : " +roomId);
      
      socket.join(roomId);
    });

    socket.on("sendMessage",async ({firstName,lastName,loginUserId,photoUrl,targetUserId,text}) => {

 
      // console.log(firstName +" : "+ text);
      // save message to db
      try {
      const roomId = [loginUserId, targetUserId].sort().join("_");

        let Chat = await chat.findOne({
          participants:{$all:[loginUserId,targetUserId]}
        })

        if(!Chat){
          Chat = new chat({
            participants:[loginUserId,targetUserId],
            messages:[]

          })
        }

        Chat.messages.push({
          sender:loginUserId,
          text
        })
        
        await Chat.save()

      io.to(roomId).emit("messageRecieved",{firstName,lastName,text,photoUrl})

      } catch (error) {
        console.log(error);
        
      }



    });

    socket.on("disconnect", () => {});
  });
};

export default initilizeSocket;
