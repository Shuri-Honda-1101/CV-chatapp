import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { AuthContext } from "../AuthServise";
import { useContext, useState } from "react";

export const ModalCredential = ({
  setNowPassword,
  nowPassword,
  setOpenCredential,
  setPassword,
  setEmail,
}) => {
  const user = useContext(AuthContext);
  //フォーム送信時の処理
  //   const onDeleteKeySubmit = (e) => {
  //     e.preventDefault();
  //     if (deleteKey === roomDeleteKey) {
  //       deleteRoomFunc(roomIndex);
  //       setOpenDeleteKey(false);
  //     } else {
  //       window.alert("削除キーが違います");
  //     }
  //   };

  //×ボタンクリック時の処理
  const onClickCloseDeleteKey = () => {
    setOpenCredential(false);
    setPassword("");
    setEmail(user.email);
  };

  return (
    <>
      <DeleteKeyWrap>
        <DeleteKey>
          <StyledCloseIcon onClick={onClickCloseDeleteKey} />
          <DeleteKeyForm
          //   onSubmit={onDeleteKeySubmit}
          >
            <h4 className="form-title">現在のパスワード</h4>
            <div className="form-input">
              <input
                type="password"
                name="now-password"
                id="now-password"
                required="required"
                value={nowPassword}
                placeholder="現在のパスワード"
                onChange={(e) => setNowPassword(e.target.value)}
              />
            </div>
            <StyledSubmitButton
              className="signup"
              variant="contained"
              type="submit"
            >
              OK
            </StyledSubmitButton>
          </DeleteKeyForm>
        </DeleteKey>
      </DeleteKeyWrap>
    </>
  );
};

const DeleteKeyWrap = styled.section`
  z-index: 5;
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

const DeleteKey = styled.div`
  background-color: #fffffe;
  width: calc(772 / 1920 * 100vw);
  height: calc(580 / 1920 * 100vw);
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

const DeleteKeyForm = styled.form`
  margin: calc(30 / 1920 * 100vw) calc(61.5 / 1920 * 100vw)
    calc(80 / 1920 * 100vw);
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
    justify-content: center;
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
