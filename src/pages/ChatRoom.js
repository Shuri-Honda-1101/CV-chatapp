import { useContext, useEffect, useState } from "react";
import firebase from "../config/firebase";
import { AuthContext } from "../AuthServise";
import { Item } from "./Item";
import styled from "styled-components";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";

export const ChatRoom = ({ roomIds, roomIndex, rooms }) => {
  const [messages, setMessages] = useState(null);
  const [value, setValue] = useState("");
  const [messageIds, setMessageIds] = useState(null);
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  const user = useContext(AuthContext);

  //チャットメッセージ送信時の処理
  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .firestore()
      .collection("rooms")
      .doc(roomIds[roomIndex])
      .collection("messages")
      .add({
        content: value,
        user: user.displayName,
        time: timestamp,
        //Timeはnew Dateでとってしまうと、ブラウザの時間を取得するため、ブラウザの時間をいじっていると表示がおかしくなってしまう。
        // そのため、firestoreで入力時の時間を取得するメソッドを使う。→ firestore.FieldValue.serverTimestamp()
        avatar: user.photoURL,
      });
    setValue("");
  };

  //メッセージ一覧と各ドキュメントIDを配列としてfirestoreからリアルタイムに取得する
  useEffect(() => {
    firebase
      .firestore()
      .collection("rooms")
      .doc(roomIds[roomIndex])
      .collection("messages")
      .orderBy("time")
      .onSnapshot((snapshot) => {
        let messages = snapshot.docs.map((doc) => {
          return doc.data({ serverTimestamps: "estimate" });
        });
        messages = messages.map((message) => {
          message.year = message.time.toDate().getFullYear();
          message.month = ("0" + (message.time.toDate().getMonth() + 1)).slice(
            -2
          );
          message.date = ("0" + message.time.toDate().getDate()).slice(-2);
          message.hour = ("0" + message.time.toDate().getHours()).slice(-2);
          message.min = ("0" + message.time.toDate().getMinutes()).slice(-2);
          return message;
        });
        // messages.sort((a, b) => {
        //   if (a.time < b.time) {
        //     return -1;
        //   } else {
        //     return 1;
        //   }
        // });

        //firestoreにソートするメソッド"orderBy"があるため、そちらを使う。

        const messageIds = snapshot.docs.map((doc) => {
          return doc.id;
        });

        setMessageIds(messageIds);
        setMessages(messages);
      });
  }, [roomIds, roomIndex]);

  return (
    <ChatRoomWrap>
      <ChatRoomHeader className="chat-room_header">
        <h2>{rooms[roomIndex].name}</h2>
      </ChatRoomHeader>
      <ChatLog className="chat-log">
        <ul>
          {messages &&
            messages.map((message, index) => {
              return (
                <Item
                  key={messageIds[index]}
                  user={message.user}
                  content={message.content}
                  avatar={message.avatar}
                  year={message.year}
                  month={message.month}
                  date={message.date}
                  hour={message.hour}
                  min={message.min}
                />
              );
            })}
        </ul>
      </ChatLog>
      <ChatSubmit className="chat-submit">
        <form onSubmit={handleSubmit}>
          <div>
            <TextareaAutosize
              rowsMax={13}
              className="message-input"
              type="text"
              value={value}
              placeholder="メッセージを入力"
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <SSubmitButton type="submit">
            <SSendIcon />
          </SSubmitButton>
        </form>
      </ChatSubmit>
    </ChatRoomWrap>
  );
};

const ChatRoomWrap = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

const ChatRoomHeader = styled.div`
  border-bottom-width: 1px;
  border-bottom-style: solid;
  width: 100%;
  height: 5.15vw;
  color: #fffffe;
  border-bottom-color: #707070;
  background-color: #90b4ce;
  display: flex;
  align-items: center;
  padding: 0 1.6rem;
  h2 {
    font-family: "ヒラギノ丸ゴ ProN";
    font-size: 3.1rem;
  }
`;

const ChatLog = styled.div`
  overflow: scroll;
  /* IE, Edge 対応 */
  -ms-overflow-style: none;
  /* Firefox 対応 */
  scrollbar-width: none;
  /* Chrome, Safari 対応 */
  ::-webkit-scrollbar {
    display: none;
  }
  display: flex;
  flex-direction: column;
  justify-content: start;
  max-height: 80.6%;
`;

const ChatSubmit = styled.div`
  margin-top: auto;
  min-height: 10.9rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: #707070;
  form {
    padding: 1.8rem;
    display: flex;
    align-items: center;
  }
  .message-input {
    width: 78.9rem;
    min-height: 7.6rem;
    border-radius: 1.8rem;
    border: 1px solid #707070;
    font-size: 3.2rem;
    padding: 1.9rem 2.9rem;
    ::placeholder {
      color: rgba(95, 108, 123, 0.56);
    }
  }
`;

const SSubmitButton = styled(Button)`
  margin-top: auto;
  margin-left: 4.3rem;
  width: 8.8rem;
  color: #fff;
  background-color: #ef4565;
  border-radius: 0.62vw; //1.2rem;
  padding: 0;
  :hover {
    background-color: #dc004e;
  }
  height: 3.9vw; //7.5rem;
`;

const SSendIcon = styled(SendIcon)`
  font-size: 3.8rem;
  transform: translate(3px, -3px) rotate(-45deg);
`;
