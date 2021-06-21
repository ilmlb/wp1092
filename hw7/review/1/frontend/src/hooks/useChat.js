// import { useState } from "react";  
// const useChat = () => {
//   const [status, setStatus] = useState({}); // { type, msg }
//   const sendMessage = (payload) => {
//     console.log(payload);
//   }; // { key, msg }
//   return { status, sendMessage };
// };
import { useState } from "react";

const client = new WebSocket("ws://localhost:8080");
client.onopen = () => console.log("Server connected.");

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState({});

  client.onmessage = (byteString) => {
    const { data } = byteString;
    const e = JSON.parse(data);
    const {type} = JSON.parse(data);
    console.log(type);
    switch (type) {
      case "CHAT": {
        console.log(e.data.messages);
        const msg = e.data.messages;
        setMessages(() => [...msg]);
        break;
      }
      case "MESSAGE": {
        console.log(e.data.message);
        const msg = e.data.message;
        let newMsg = messages;
        newMsg.push(msg);
        setMessages(() => [...newMsg]);
        // setStatus(payload);
        break;
      }

      default:
        break;
    }
  };

  const sendData = async (data) => {
    await client.send(JSON.stringify(data));
    // console.log(data);
  };

  const startChat = (payload) => {
    console.log(payload);
    sendData({type: 'CHAT', data: payload});
  }

  const sendMessage = (payload) => {
    // console.log(payload);
    sendData({type: 'MESSAGE', data: payload});
  };

  const clearMessages = () => {
    sendData(["clear"]);
  };

  return {
    status,
    messages,
    startChat,
    sendMessage,
    clearMessages,
  };
};
export default useChat;


