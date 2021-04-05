import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthServise";
import firebase from "../config/firebase";
import { Item } from "./Item";

export const Room = () => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState(null);
  const user = useContext(AuthContext);
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.firestore().collection("messages").add({
      content: value,
      user: user.displayName,
      time: timestamp,
      //Timeはnew Dateでとってしまうと、ブラウザの時間を取得するため、ブラウザの時間をいじっていると表示がおかしくなってしまう。
      // そのため、firestoreで入力時の時間を取得するメソッドを使う。→ firestore.FieldValue.serverTimestamp()
      avatar: user.photoURL,
    });
    setValue("");
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("messages")
      .orderBy("time")
      .onSnapshot((snapshot) => {
        const preMessages = snapshot.docs.map((doc) => {
          return doc.data({ serverTimestamps: "estimate" });
        });
        const messages = preMessages.map((message) => {
          message.year = message.time.toDate().getFullYear();
          message.month = message.time.toDate().getMonth() + 1;
          message.date = message.time.toDate().getDate();
          message.hour = message.time.toDate().getHours();
          message.min = message.time.toDate().getMinutes();
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

        setMessages(messages);
      });
  }, []);

  return (
    <>
      <h1>Room</h1>
      <ul>
        {messages &&
          messages.map((message, index) => {
            return (
              <Item
                key={index}
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">送信</button>
      </form>
      <button onClick={() => firebase.auth().signOut()}>Logout</button>
    </>
  );
};
