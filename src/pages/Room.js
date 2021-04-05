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
