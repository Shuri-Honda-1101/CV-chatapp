import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { useState } from "react";

export const ModalDeleteKey = ({
  setOpenDeleteKey,
  roomDeleteKey,
  roomIndex,
  deleteRoomFunc,
}) => {
  const [deleteKey, setDeleteKey] = useState("");

  //フォーム送信時の処理
  const onDeleteKeySubmit = (e) => {
    e.preventDefault();
    if (deleteKey === roomDeleteKey) {
      deleteRoomFunc(roomIndex);
      setOpenDeleteKey(false);
    } else {
      window.alert("削除キーが違います");
    }
  };

  //×ボタンクリック時の処理
  const onClickCloseDeleteKey = () => {
    setOpenDeleteKey(false);
  };

  return (
    <>
      <DeleteKeyWrap>
        <DeleteKey>
          <StyledCloseIcon onClick={onClickCloseDeleteKey} />
          <DeleteKeyForm onSubmit={onDeleteKeySubmit}>
            <h4 className="form-title">ルーム削除</h4>
            <div className="form-input">
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
              OK
            </StyledSubmitButton>
          </DeleteKeyForm>
        </DeleteKey>
      </DeleteKeyWrap>
    </>
  );
};

const DeleteKeyWrap = styled.section`
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

const DeleteKey = styled.div`
  background-color: #fffffe;
  width: 77.2rem;
  height: 58rem;
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

const DeleteKeyForm = styled.form`
  margin: 3rem 6.15rem 8rem;
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
    justify-content: center;
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
