import { useState, useEffect } from "react";
import useChat from "../hooks/useChat";

// const LOCALSTORAGE_ChatBoxes_KEY = "save-chat-box";

const useChatBox = (me, activeKey) => {
  const LOCALSTORAGE_ChatBoxes_KEY = me;
  const savedChatBoxes = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_ChatBoxes_KEY)
  );

  const { startChat } = useChat();
  const [chatBoxes, setChatBoxes] = useState(savedChatBoxes || []);
  // console.log(chatBoxes)

  const createChatBox = (friend, me) => {
    const newKey = me <= friend ? `${me}_${friend}` : `${friend}_${me}`;
    if (chatBoxes.some(({ key }) => key === newKey)) {
      throw new Error(friend + "'s chat box has already opened.");
    }
    if (friend.includes("_")) {
      throw new Error("No '_' in " + friend + "'s name");
    }
    const newChatBoxes = [...chatBoxes];
    const chatLog = [];
    newChatBoxes.push({ friend, key: newKey, chatLog });
    setChatBoxes(newChatBoxes);
    startChat({ name: me, to: friend });
    return newKey;
  };

  const removeChatBox = (targetKey, activeKey) => {
    let newActiveKey = activeKey;
    let lastIndex;
    chatBoxes.forEach(({ key }, i) => {
      if (key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newChatBoxes = chatBoxes.filter(
      (chatBox) => chatBox.key !== targetKey
    );
    if (newChatBoxes.length) {
      if (newActiveKey === targetKey) {
        if (lastIndex >= 0) {
          newActiveKey = newChatBoxes[lastIndex].key;
        } else {
          newActiveKey = newChatBoxes[0].key;
        }
      }
    } else newActiveKey = ""; // No chatBox left
    setChatBoxes(newChatBoxes);
    return newActiveKey;
  };

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_ChatBoxes_KEY, JSON.stringify(chatBoxes));
  }, [chatBoxes]);

  useEffect(() => {
    let saved = JSON.parse(localStorage.getItem(LOCALSTORAGE_ChatBoxes_KEY));
    for (let i = 0; i < saved.length; i++) {
      let name = saved[i].key.split("_")[0];
      let to = saved[i].key.split("_")[1];
      startChat({ name, to });
    }
  }, []);

  return { chatBoxes, createChatBox, removeChatBox };
};
export default useChatBox;
