import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthServise";
import firebase from "../config/firebase";
import styled from "styled-components";
import Logo from "../img/logo.png";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { RoomListItem } from "./RoomListItem";
import { ModalNewRoom } from "./ModalNewRoom";
import { ModalDeleteKey } from "./ModalDeleteKey";
import { ChatRoom } from "./ChatRoom";
import { ModalEditProfile } from "./ModalEditProfile";

export const Room = () => {
  const [rooms, setRooms] = useState(null);
  const [roomIds, setRoomIds] = useState(null);
  const [newRoom, setNewRoom] = useState(false);
  const [roomIndex, setRoomIndex] = useState(null);
  const [openDeleteKey, setOpenDeleteKey] = useState(false);
  const [roomDeleteKey, setRoomDeleteKey] = useState(null);
  const [openEditProfile, setOpenEditProfile] = useState(false);
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

  //ModalEditProfileの処理
  const onClickEditProfile = () => {
    setOpenEditProfile(true);
  };

  const onClickCloseEditProfile = () => {
    setOpenEditProfile(false);
  };

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
      {openEditProfile && (
        <ModalEditProfile
          onClickCloseEditProfile={onClickCloseEditProfile}
          roomIds={roomIds}
        />
      )}
      <Wrap>
        <section style={{ width: "16%" }} className="profile_wrap_grid">
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
              <Button onClick={onClickEditProfile} className="profile-edit">
                プロフィールを編集する
              </Button>
            </Profile>
            <LogoutBtn
              onClick={() => firebase.auth().signOut()}
              variant="contained"
              className="logout"
            >
              ログアウト
            </LogoutBtn>
          </ProfileWrap>
        </section>
        <section style={{ width: "16%" }} className="room-list_wrap_grid">
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
                        key={roomIds[index]}
                        roomName={room.name}
                        index={index}
                        deleteKey={room.deleteKey}
                        setRoomIndex={setRoomIndex}
                        setOpenDeleteKey={setOpenDeleteKey}
                        setRoomDeleteKey={setRoomDeleteKey}
                        roomIndex={roomIndex}
                      />
                    );
                  })}
              </ul>
            </RoomList>
          </RoomListWrap>
        </section>
        <section style={{ width: "68%" }} className="chat-room">
          {roomIndex === null || (
            <ChatRoom roomIndex={roomIndex} rooms={rooms} roomIds={roomIds} />
          )}
        </section>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  background-color: #fffffe;
  display: flex;
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
  min-height: 5.15vw;
  height: 5.15vw;
  color: #fffffe;
`;
const ProfileHeader = styled(Header)`
  border-bottom-color: #90b4ce;
  font-family: "Montserrat", sans-serif;
  font-size: calc(44 / 1920 * 100vw);
  line-height: calc(54 / 1920 * 100vw);
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    height: calc(39 / 1920 * 100vw);
    transform: translate(-8%, 11%);
  }
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  /* IE, Edge 対応 */
  -ms-overflow-style: none;
  /* Firefox 対応 */
  scrollbar-width: none;
  /* Chrome, Safari 対応 */
  ::-webkit-scrollbar {
    display: none;
  }
  .user-icon {
    border-radius: 50%;
    height: calc(186 / 1920 * 100vw);
  }
  .user-name {
    font-family: "Montserrat", sans-serif;
    color: #fffffe;
    font-size: calc(44 / 1920 * 100vw);
    margin: calc(18 / 1920 * 100vw) 0;
  }
  .profile-edit {
    color: #fffffe;
    font-family: "ヒラギノ角ゴ ProN W3", "HiraKakuProN-W3",
      "ヒラギノ角ゴ Pro W3", "HiraKakuPro-W3", "メイリオ", Meiryo;
    font-size: calc(21 / 1920 * 100vw);
    font-weight: normal;
    padding: 0;
    min-width: 0;
    letter-spacing: 0;
  }
`;

const LogoutBtn = styled(Button)`
  min-width: calc(219 / 1920 * 100vw);
  width: calc(219 / 1920 * 100vw);
  color: #fff;
  background-color: #ef4565;
  font-size: calc(31 / 1920 * 100vw);
  border-radius: calc(12 / 1920 * 100vw);
  font-family: "ヒラギノ丸ゴ Pro W4", "ヒラギノ丸ゴ Pro",
    "Hiragino Maru Gothic Pro", "HG丸ｺﾞｼｯｸM-PRO", "HGMaruGothicMPRO";
  font-weight: normal;
  line-height: calc(60 / 1920 * 100vw);
  padding: 0;
  :hover {
    background-color: #dc004e;
  }
  height: calc(75 / 1920 * 100vw);
  margin-bottom: calc(26 / 1920 * 100vw);
`;

const RoomListWrap = styled.div`
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
  padding: 0 0 0 calc(16 / 1920 * 100vw);
  h2 {
    font-family: "ヒラギノ丸ゴ Pro W4", "ヒラギノ丸ゴ Pro",
      "Hiragino Maru Gothic Pro", "HG丸ｺﾞｼｯｸM-PRO", "HGMaruGothicMPRO",
      "Montserrat", sans-serif;
    font-size: 1.6vw; //alc(31 / 1920 * 100vw);
  }
`;

const StyledAddCircleIcon = styled(AddCircleIcon)`
  font-size: calc(52 / 1920 * 100vw);
  color: #ef4565;
  position: relative;
`;

const RoomList = styled.div`
  width: 100%;
  overflow: scroll;
  /* IE, Edge 対応 */
  -ms-overflow-style: none;
  /* Firefox 対応 */
  scrollbar-width: none;
  /* Chrome, Safari 対応 */
  ::-webkit-scrollbar {
    display: none;
  }
`;

const StyledAddRoomButton = styled(Button)`
  min-width: calc(64 / 1920 * 100vw);
  margin-left: auto;
  position: relative;
  padding: 0;
  :before {
    content: "";
    height: calc(32 / 1920 * 100vw);
    width: calc(32 / 1920 * 100vw);
    background-color: #fff;
    display: inline-block;
    position: absolute;
    border-radius: 50%;
  }
`;
