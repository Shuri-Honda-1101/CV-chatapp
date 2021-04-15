import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthServise";
import firebase from "../config/firebase";
import { Item } from "./Item";
import styled from "styled-components";
import Logo from "../img/logo.png";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { RoomListItem } from "./RoomListItem";
import { ModalNewRoom } from "./ModalNewRoom";

export const Room = () => {
  const [value, setValue] = useState("");
  const [rooms, setRooms] = useState(null);

  const [messages, setMessages] = useState(null);
  const user = useContext(AuthContext);
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  const [newRoom, setNewRoom] = useState(false);

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

  const onClickAddRoom = () => {
    setNewRoom(true);
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("rooms")
      .onSnapshot((snapshot) => {
        const rooms = snapshot.docs.map((doc) => {
          return doc.data();
        });
        setRooms(rooms);
      });
  }, []);

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
      {newRoom && <ModalNewRoom setNewRoom={setNewRoom} />}
      <Wrap>
        <Grid container spacing={0}>
          <Grid item xs={2} className="profile_wrap_grid">
            <ProfileWrap className="profile_wrap">
              <ProfileHeader className="profile_header">
                <h1>
                  <span>
                    <img src={Logo} alt="logo" />
                  </span>
                  -Bond
                </h1>
              </ProfileHeader>
              <Profile className="profile">
                <img
                  className="user-icon"
                  src={user.photoURL}
                  alt="ユーザーアイコン"
                />
                <p className="user-name">{user.displayName}</p>
                <Button className="profile-edit">プロフィールを編集する</Button>
              </Profile>
              <LogoutBtn variant="contained" className="logout">
                ログアウト
              </LogoutBtn>
            </ProfileWrap>
          </Grid>
          <Grid item xs={2} className="room-list_wrap_grid">
            <RoomListWrap className="room-list_wrap">
              <RoomListHeader className="room-list_header">
                <h2>トークルーム</h2>
                <StyledAddRoomButton onClick={onClickAddRoom}>
                  <StyledAddCircleIcon></StyledAddCircleIcon>
                </StyledAddRoomButton>
              </RoomListHeader>
              <RoomList className="room-list">
                <ul>
                  {rooms &&
                    rooms.map((room, index) => {
                      return <RoomListItem key={index} roomName={room.name} />;
                    })}
                </ul>
              </RoomList>
            </RoomListWrap>
          </Grid>
          <Grid item xs={8} className="chat-room">
            <div className="chat-room_header"></div>
            <div className="chat-log">
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
            </div>
            <div className="chat-submit">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <button type="submit">送信</button>
              </form>
              <button onClick={() => firebase.auth().signOut()}>Logout</button>
            </div>
          </Grid>
        </Grid>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  background-color: #fffffe;
`;

const ProfileWrap = styled.section`
  background-color: #094067;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
`;
const Header = styled.div`
  border-bottom-width: 1px;
  border-bottom-style: solid;
  width: 100%;
  height: 5.15vw;
  color: #fffffe;
`;
const ProfileHeader = styled(Header)`
  border-bottom-color: #90b4ce;
  font-family: Montserrat;
  font-size: 2.3vw; //4.4rem;
  line-height: 2.8vw; //5.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    height: 2vw; //3.9rem;
    transform: translate(-8%, 11%);
  }
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  .user-icon {
    border-radius: 50%;
    height: 18.6rem;
  }
  .user-name {
    font-family: Montserrat;
    color: #fffffe;
    font-size: 4.4rem;
    margin: 1.8rem 0;
  }
  .profile-edit {
    color: #fffffe;
    font-family: "ヒラギノ角ゴシック";
    font-size: 2.1rem;
    font-weight: normal;
    padding: 0;
  }
`;

const StyledButton = styled(Button)`
  width: 11.4vw; //21.9rem;
  color: #fff;
  background-color: #ef4565;
  font-size: 3.1rem;
  border-radius: 0.62vw; //1.2rem;
  font-family: "ヒラギノ丸ゴ ProN";
  font-weight: normal;
  line-height: 3.1vw; //6rem;
  padding: 0;
  :hover {
    background-color: #dc004e;
  }
`;

const LogoutBtn = styled(StyledButton)`
  height: 3.9vw; //7.5rem;
  margin-bottom: 2.6rem;
`;

const RoomListWrap = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  border-right-width: 1px;
  border-right-style: solid;
  border-bottom-color: #707070;
`;
const RoomListHeader = styled(Header)`
  border-bottom-color: #707070;
  background-color: #90b4ce;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.6rem;
  h2 {
    font-family: "ヒラギノ丸ゴ ProN";
    font-size: 3.1rem;
  }
`;

const StyledAddCircleIcon = styled(AddCircleIcon)`
  font-size: 5.2rem;
  color: #ef4565;
  position: relative;
`;

const RoomList = styled.div`
  width: 100%;
  overflow: scroll;
`;

const StyledAddRoomButton = styled(Button)`
  position: relative;
  padding: 0;
  :before {
    content: "";
    height: 3.2rem;
    width: 3.2rem;
    background-color: #fff;
    display: inline-block;
    position: absolute;
    top: 1rem;
    left: 1rem;
    border-radius: 50%;
  }
`;
