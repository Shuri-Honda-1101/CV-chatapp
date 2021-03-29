import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthServise";
import firebase from "../config/firebase";
import { Item } from "./Item";

export const Room = () => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    firebase
      .firestore()
      .collection("messages")
      .orderBy("time")
      .onSnapshot((snapshot) => {
        const messages = snapshot.docs.map((doc) => {
          return doc.data();
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
  console.log(messages);

  const user = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.firestore().collection("messages").add({
      content: value,
      user: user.displayName,
      time: firebase.firestore.FieldValue.serverTimestamp(),
      avatar: user.photoURL,
    });
    setValue("");
  };

  console.log(user);

  //Timeはnew Dateでとってしまうと、ブラウザの時間を取得するため、ブラウザの時間をいじっていると表示がおかしくなってしまう。
  // そのため、firestoreで入力時の時間を取得するメソッドを使う。→ firestore.FieldValue.serverTimestamp()

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
