import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthServise";
import firebase from "../config/firebase";
import styled from "styled-components";
import Logo from "../img/logo.png";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { RoomListItem } from "./RoomListItem";
import { ModalNewRoom } from "./ModalNewRoom";
import { ModalDeleteKey } from "./ModalDeleteKey";
import { ChatRoom } from "./ChatRoom";

export const Room = () => {
  const [rooms, setRooms] = useState(null);
  const [roomIds, setRoomIds] = useState(null);
  const [newRoom, setNewRoom] = useState(false);
  const [roomIndex, setRoomIndex] = useState(null);
  const [openDeleteKey, setOpenDeleteKey] = useState(false);
  const [roomDeleteKey, setRoomDeleteKey] = useState(null);
  const user = useContext(AuthContext);

  //ルーム追加ボタンを押した時にモーダルウィンドウが表示されるための処理
  const onClickAddRoom = () => {
    setNewRoom(true);
  };

  //ルーム削除時の処理
  const deleteRoomFunc = (index) => {
    firebase
      .firestore()
      .collection("rooms")
      .doc(roomIds[index])
      .delete()
      .then(() => {
        console.log("delete completed");
      });
  };

  useEffect(() => {
    const dbRoom = firebase.firestore().collection("rooms");
    dbRoom.onSnapshot((snapshot) => {
      //ルームリスト
      const rooms = snapshot.docs.map((doc) => {
        return doc.data();
      });
      //ルームリストのドキュメントIDを配列にする
      const roomIds = snapshot.docs.map((doc) => {
        return doc.id;
      });
      setRoomIds(roomIds);
      setRooms(rooms);
    });
  }, []);

  return (
    <>
      {newRoom && <ModalNewRoom setNewRoom={setNewRoom} />}
      {openDeleteKey && (
        <ModalDeleteKey
          setOpenDeleteKey={setOpenDeleteKey}
          roomIndex={roomIndex}
          deleteRoomFunc={deleteRoomFunc}
          roomDeleteKey={roomDeleteKey}
        />
      )}
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
                      return (
                        <RoomListItem
                          key={room.roomKey}
                          roomID={room.id}
                          roomName={room.name}
                          index={index}
                          deleteKey={room.deleteKey}
                          setRoomIndex={setRoomIndex}
                          setOpenDeleteKey={setOpenDeleteKey}
                          setRoomDeleteKey={setRoomDeleteKey}
                        />
                      );
                    })}
                </ul>
              </RoomList>
            </RoomListWrap>
          </Grid>
          <Grid item xs={8} className="chat-room">
            <ChatRoom />
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
