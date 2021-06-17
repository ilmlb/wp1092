import "../App.css";
import { useState, useEffect } from "react";
import { Tabs, Input } from "antd";
import ChatModal from "../Components/ChatModal";
import useChatBox from "../hooks/useChatBox";
// import useChat from "../hooks/useChat";
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import { CHATBOX_QUERY } from '../graphql/queries'
import { CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION } from '../graphql/mutations'
import { CHATBOX_SUBSCRIPTION } from '../graphql/subscription'

// const server = new WebSocket('ws://localhost:8080');
// server.onopen = () => console.log('Server connected.');
// server.sendEvent = (e) => server.send(JSON.stringify(e));

const { TabPane } = Tabs;
const ChatRoom = ({ me, displayStatus }) => {
    // const [chatBoxes, setChatBoxes] = useState([
    //     {
    //         friend: "Mary", key: "MaryChatbox",
    //         chatLog: []
    //     },
    //     {
    //         friend: "Peter", key: "PeterChatBox",
    //         chatLog: []
    //     }
    // ]);
    const [messageInput, setMessageInput] = useState("");
    const [activeKey, setActiveKey] = useState("");
    const {chatBoxes, setChatBoxes, createChatBox, removeChatBox} = useChatBox();
    // const {status, sendMessage} = useChat();
    const [modalVisible, setModalVisible] = useState(false);

    const addChatBox = () => { setModalVisible(true); };

    // const createChatBox = (friend) => {
    //     const newKey = me <= friend ?
    //           `${me}_${friend}` : `${friend}_${me}`;
    //     if (chatBoxes.some(({ key }) => key === newKey)) {
    //       throw new Error(friend +
    //                       "'s chat box has already opened.");
    //     }
    //     const newChatBoxes = [...chatBoxes];
    //     const chatLog = [];
    //     newChatBoxes.push({ friend, key: newKey, chatLog });
    //     setChatBoxes(newChatBoxes);
    //     setActiveKey(newKey);
    // };

    // const removeChatBox = (targetKey) => {
    //     let newActiveKey = activeKey;
    //     let lastIndex;
    //     chatBoxes.forEach(({ key }, i) => {
    //       if (key === targetKey) { lastIndex = i - 1; }});
    //     const newChatBoxes = chatBoxes.filter(
    //       (chatBox) => chatBox.key !== targetKey);
    //     if (newChatBoxes.length) {
    //       if (newActiveKey === targetKey) {
    //         if (lastIndex >= 0) {
    //           newActiveKey = newChatBoxes[lastIndex].key;
    //         } else { newActiveKey = newChatBoxes[0].key; }
    //       }
    //     } else newActiveKey = ""; // No chatBox left
    //     setChatBoxes(newChatBoxes);
    //     setActiveKey(newActiveKey);
    // };  
    
    // let chatLog = [];
    // server.onmessage = (m) => {
    //     // onEvent(JSON.parse(m.data));
    //     const e = JSON.parse(m.data);
    //     console.log('e',e);
    //     const { type, chatBoxName, data } = e;
    //     const cbs = [...chatBoxes];        
    //     const box = cbs.findIndex(b => b.key === chatBoxName);
    //     let msgs = [];
    //     switch (type) {
    //         case 'CHAT': {
    //             // chatLog = e.data.messages;
    //             msgs = [...cbs[box].chatLog, ...data.messages];
    //             break;
    //         }
    //         case 'MESSAGE': {
    //             // chatLog.push(e.data.message);
    //             msgs = [...cbs[box].chatLog, data.message];
    //             break;
    //         }
    //     }
    //     cbs[box].chatLog = msgs;
    //     setChatBoxes(cbs);
    // }
    const { data: newBox, subscribeToMore } = useQuery(CHATBOX_QUERY, {
        variables: { name: activeKey }
      });
      const [addBox] = useMutation(CREATE_CHATBOX_MUTATION);
      const [addMessage] = useMutation(CREATE_MESSAGE_MUTATION);
      const { data: newMessage } = useSubscription(CHATBOX_SUBSCRIPTION,
        { variables: { key: activeKey } }
      );
    
      useEffect(() => {
        if (newBox !== undefined  && newBox.chatboxes.length !== 0) {
          const messages = newBox.chatboxes[0].messages.map((m) => {
            return {
              name: m.sender.name,
              body: m.body
            }
          })
          let msgs = [];
          const cbs = [...chatBoxes];
          const box = cbs.findIndex(b => b.key === newBox.chatboxes[0].name)
          msgs = [...cbs[box].chatLog, ...messages]
          cbs[box].chatLog = msgs
          setChatBoxes(cbs);
        }
      }, [newBox])

      useEffect(() => {
        if (newMessage !== undefined) {
          let msgs = [];
          const cbs = [...chatBoxes];
          const box = cbs.findIndex(b => b.key === newMessage.chatBox.key)
          msgs = [...cbs[box].chatLog, {
            name: newMessage.chatBox.sender,
            body: newMessage.chatBox.body
          }];
          cbs[box].chatLog = msgs
          setChatBoxes(cbs);
        }
      }, [newMessage]);

    return (
        <> 
            <div className="App-title">
            <h1>{me}'s Chat Room</h1> </div>
            <div className="App-messages">
                <Tabs 
                    type="editable-card"
                    activeKey={activeKey}
                    onChange={(key) => { setActiveKey(key); }} 
                    onEdit={(targetKey, action) => {
                        if (action === "add") addChatBox();
                        else if (action === "remove") setActiveKey(removeChatBox(targetKey, activeKey));
                    }}            
                >
                    {chatBoxes.map(({ friend, key, chatLog }) => {
                        return (
                            <TabPane tab={friend}
                                key={key} closable={true}>
                                {/* <p>{friend}'s chatbox.</p> */}
                                <div className="App-messages">
                                    {chatLog.map(({name, body}, i) => 
                                        {
                                            if (name === friend) {
                                                return <p className="App-message" key={i}>{name} <span className="message">{body}</span></p>
                                            } else {
                                                return <p className="App-message" key={i} style={{textAlign: 'right'}}><span className="message">{body}</span> {name}</p>
                                            }
                                        }
                                    )}
                                </div>
                            </TabPane>
                        );
                    })}
                </Tabs>
                <ChatModal
                    visible={modalVisible}
                    onCreate={({ name }) => {
                        addBox({
                            variables: {
                              from: me, 
                              to: name,
                            },
                        })
                        setActiveKey(createChatBox(name, me));
                        setModalVisible(false);
                        // server.sendEvent({
                        //     type: 'CHAT',
                        //     data: { to: name, name: me },
                        // });
                    }}
                    onCancel={() => {
                        setModalVisible(false);
                    }}
                />
            </div>
            <Input.Search
                value={messageInput}
                onChange={(e) =>
                    setMessageInput(e.target.value)}
                enterButton="Send"
                placeholder="Enter message here..."
                onSearch={(msg) => {
                    if (!msg) {
                        displayStatus({
                          type: "error",
                          msg: "Please enter message.",
                        });
                        return;
                    } else if (activeKey === "") {
                        displayStatus({
                            type: "error",
                            msg: "Please add a chatbox first.",
                        });
                        setMessageInput("");
                        return;
                    }
                    // sendMessage({ key: activeKey, sender: me, body: msg });
                    addMessage({
                        variables: {
                        key: activeKey,
                        from: me,
                        body: msg,
                        },
                    })
                    setMessageInput("");            
                }}
            ></Input.Search>
        </>
    );
};
export default ChatRoom;
