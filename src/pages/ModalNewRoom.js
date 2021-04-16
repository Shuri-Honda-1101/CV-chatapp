import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import firebase from "../config/firebase";
import shortid from "shortid";
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
      roomKey: shortid.generate(),
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
  width: 77.2rem;
  height: 87.5rem;
  border-radius: 6.5rem;
  display: flex;
  flex-direction: column;
  padding: 5.75rem 7.05rem;
`;

const StyledCloseIcon = styled(CloseIcon)`
  display: inline-block;
  color: #ef4565;
  font-size: 2.6vw; //5rem;
  margin-left: auto;
  //ここだけ右寄せにする処理
`;

const NewRoomForm = styled.form`
  margin: 8.15rem 6.15rem 13.15rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  .form-title {
    font-family: "ヒラギノ丸ゴ ProN";
    font-size: 5rem;
    color: #7a92a3;
  }
  .form-input {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 37.8%;
    input {
      height: 7.5rem;
      width: 50.9rem;
      border: 1px solid #707070;
      border-radius: 1.2rem;
      font-size: 2.2rem;
      padding-left: 2.9rem;
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
  font-size: 3.5rem;
  padding: 0;
  height: 7.5rem;
  width: 21.9rem;
  border-radius: 1.2rem;
`;
