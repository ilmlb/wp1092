import "../App.css";
import { useState } from "react";
import { Tabs, Input, Tag } from "antd";
import ChatModal from "../Components/ChatModal";
import useChatBox from "../hooks/useChatBox";
import useChat from "../hooks/useChat";

const { TabPane } = Tabs;
const ChatRoom = ({ me, displayStatus }) => {
  const [messageInput, setMessageInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("");
  const { chatBoxes, createChatBox, removeChatBox } = useChatBox(me);
  const { messages, startChat, sendMessage } = useChat();

  const addChatBox = () => {
    setModalVisible(true);
  };

  return (
    <>
      {" "}
      <div className="App-title">
        <h1>{me}'s Chat Room</h1>{" "}
      </div>
      <div className="App-messages">
        <Tabs
          type="editable-card"
          onEdit={(targetKey, action) => {
            if (action === "add") addChatBox();
            else if (action === "remove") {
              let k = removeChatBox(targetKey, activeKey);
              setActiveKey(k);
              let name = k.split("_")[0];
              let to = k.split("_")[1];
              startChat({ name, to });
            }
          }}
          activeKey={activeKey}
          onChange={(key) => {
            setActiveKey(key);
            let name = key.split("_")[0];
            let to = key.split("_")[1];
            startChat({ name, to });
          }}
          // style={{position:"fixed"}}
        >
          {chatBoxes.map(({ friend, key, chatLog }) => {
            return (
              <TabPane tab={friend} key={key} closable={true}>
                <p>{friend}'s chatbox.</p>
              </TabPane>
            );
          })}
        </Tabs>
        <ChatModal
          visible={modalVisible}
          onCreate={({ name }) => {
            setActiveKey(createChatBox(name, me));
            setModalVisible(false);
          }}
          onCancel={() => {
            setModalVisible(false);
          }}
        />
        {/* <div style={{display:"inline-block", margin:"15vh 0 0 0"}}></div> */}
        <div>
          {messages.length === 0 || activeKey === "" ? (
            <p style={{ color: "#ccc" }}> No messages... </p>
          ) : (
            messages.map(({ name, body }, i) => {
              let output = body;
              // for (let i = 10; i < output.length; i += 10) {
              //   output = [output.slice(0, i), <br />, output.slice(i)].join("");
              // }
              if (name === me) {
                return (
                  <p
                    className="App-message"
                    key={i}
                    style={{
                      float: "right",
                      clear: "both",
                      wordWrap: "break-word",
                      wordBreak: "break-all",
                      textAlignLast: "right",
                    }}
                  >
                    {output}{" "}
                    <Tag
                      color="blue"
                      style={{ float: "right", clear: "both", margin: "0.5vw" }}
                    >
                      {" "}
                      {name}
                    </Tag>
                  </p>
                );
              } else {
                return (
                  <p
                    className="App-message"
                    key={i}
                    style={{
                      float: "left",
                      clear: "both",
                      wordWrap: "break-word",
                      wordBreak: "break-all",
                      textAlignLast: "left",
                    }}
                  >
                    <Tag
                      color="blue"
                      style={{ float: "left", clear: "both", margin: "0.5vw" }}
                    >
                      {" "}
                      {name}
                    </Tag>
                    {output}
                  </p>
                );
              }
            })
          )}
        </div>
      </div>
      <Input.Search
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
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
          let name = me;
          let to = "";
          if (activeKey.split("_")[0] === me) {
            to = activeKey.split("_")[1];
          } else {
            to = activeKey.split("_")[0];
          }
          // console.log(friend);
          sendMessage({ name, to, body: msg });
          setMessageInput("");
        }}
      ></Input.Search>
    </>
  );
};
export default ChatRoom;
