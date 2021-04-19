import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import firebase from "../config/firebase";
import { useState } from "react";

export const ModalNewRoom = ({ setNewRoom }) => {
  const [roomName, setRoomName] = useState("");
  const [deleteKey, setDeleteKey] = useState("");

  //フォーム送信時の処理
  const onNewRoomSubmit = (e) => {
    e.preventDefault();
    const newRoomId = firebase.firestore().collection("rooms").doc();
    newRoomId.set({
      name: roomName,
      deleteKey: deleteKey,
    });
    setRoomName("");
    setDeleteKey("");
    setNewRoom(false);
  };

  //×ボタンクリック時の処理
  const onClickCloseNewRoom = () => {
    setNewRoom(false);
  };

  return (
    <>
      <NewRoomWrap>
        <NewRoom>
          <StyledCloseIcon onClick={onClickCloseNewRoom} />
          <NewRoomForm onSubmit={onNewRoomSubmit}>
            <h4 className="form-title">新規ルーム作成</h4>
            <div className="form-input">
              <input
                type="text"
                name="room-name"
                id="room-name"
                required="required"
                value={roomName}
                placeholder="ルーム名"
                onChange={(e) => setRoomName(e.target.value)}
              />
              <input
                type="password"
                name="delete-key"
                id="delete-key"
                required="required"
                value={deleteKey}
                placeholder="削除キー"
                onChange={(e) => setDeleteKey(e.target.value)}
              />
            </div>
            <StyledSubmitButton
              className="signup"
              variant="contained"
              type="submit"
            >
              新規作成
            </StyledSubmitButton>
          </NewRoomForm>
        </NewRoom>
      </NewRoomWrap>
    </>
  );
};

const NewRoomWrap = styled.section`
  z-index: 4;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;
`;

const NewRoom = styled.div`
  background-color: #fffffe;
  width: calc(772 / 1920 * 100vw);
  height: calc(875 / 1920 * 100vw);
  border-radius: calc(65 / 1920 * 100vw);
  display: flex;
  flex-direction: column;
  padding: calc(57.5 / 1920 * 100vw) calc(70.5 / 1920 * 100vw);
`;

const StyledCloseIcon = styled(CloseIcon)`
  display: inline-block;
  color: #ef4565;
  font-size: 2.6vw;
  margin-left: auto;
  //ここだけ右寄せにする処理
`;

const NewRoomForm = styled.form`
  margin: calc(81.5 / 1920 * 100vw) calc(61.5 / 1920 * 100vw)
    calc(131.5 / 1920 * 100vw);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  .form-title {
    font-family: "ヒラギノ丸ゴ ProN";
    font-size: calc(50 / 1920 * 100vw);
    color: #7a92a3;
  }
  .form-input {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 37.8%;
    input {
      height: calc(75 / 1920 * 100vw);
      width: calc(509 / 1920 * 100vw);
      border: 1px solid #707070;
      border-radius: calc(12 / 1920 * 100vw);
      font-size: calc(22 / 1920 * 100vw);
      padding-left: calc(29 / 1920 * 100vw);
      ::placeholder {
        color: rgba(95, 108, 123, 0.56);
      }
    }
  }
`;

const StyledSubmitButton = styled(Button)`
  background-color: #ef4565;
  color: #fffffe;
  font-family: "ヒラギノ丸ゴ ProN";
  font-size: calc(35 / 1920 * 100vw);
  padding: 0;
  height: calc(75 / 1920 * 100vw);
  width: calc(219 / 1920 * 100vw);
  border-radius: calc(12 / 1920 * 100vw);
`;
