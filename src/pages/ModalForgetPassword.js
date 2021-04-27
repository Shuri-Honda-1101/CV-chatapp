import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { memo, useState } from "react";
import firebase from "../config/firebase";

export const ModalForgetPassword = memo(({ setOpenForget }) => {
  const [mail, setMail] = useState("");
  const onClickCloseForgetPassword = () => {
    setOpenForget(false);
  };
  const onForgetPasswordSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .sendPasswordResetEmail(mail)
      .then(() => {
        setOpenForget(false);
      })
      .catch(() => {
        window.alert("存在しないメールアドレスです");
        setMail("");
      });
  };
  return (
    <>
      <ForgetPasswordWrap>
        <ForgetPassword>
          <StyledCloseIcon onClick={onClickCloseForgetPassword} />
          <ForgetPasswordForm onSubmit={onForgetPasswordSubmit}>
            <h4 className="form-title">パスワードの再設定</h4>
            <div className="form-input">
              <input
                type="email"
                name="delete-key"
                id="delete-key"
                required="required"
                value={mail}
                placeholder="メールアドレス"
                onChange={(e) => setMail(e.target.value)}
              />
            </div>
            <StyledSubmitButton
              className="signup"
              variant="contained"
              type="submit"
            >
              OK
            </StyledSubmitButton>
          </ForgetPasswordForm>
        </ForgetPassword>
      </ForgetPasswordWrap>
    </>
  );
});

const ForgetPasswordWrap = styled.section`
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

const ForgetPassword = styled.div`
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

const ForgetPasswordForm = styled.form`
  margin: calc(30 / 1920 * 100vw) calc(61.5 / 1920 * 100vw)
    calc(80 / 1920 * 100vw);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  .form-title {
    font-family: "ヒラギノ丸ゴ Pro W4", "ヒラギノ丸ゴ Pro",
      "Hiragino Maru Gothic Pro", "HG丸ｺﾞｼｯｸM-PRO", "HGMaruGothicMPRO",
      "Montserrat", sans-serif;
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
  font-family: "ヒラギノ丸ゴ Pro W4", "ヒラギノ丸ゴ Pro",
    "Hiragino Maru Gothic Pro", "HG丸ｺﾞｼｯｸM-PRO", "HGMaruGothicMPRO";
  font-size: calc(35 / 1920 * 100vw);
  padding: 0;
  height: calc(75 / 1920 * 100vw);
  width: calc(219 / 1920 * 100vw);
  border-radius: calc(12 / 1920 * 100vw);
`;
