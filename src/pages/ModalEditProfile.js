import { useState, useContext, useCallback } from "react";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import iconMask from "../img/icon-mask.png";
import { AuthContext } from "../AuthServise";
import { ModalCropper } from "./ModalCropper";
import getCroppedImg from "../cropImage";

export const ModalEditProfile = ({ onClickCloseEditProfile }) => {
  const user = useContext(AuthContext);
  const [src, setSrc] = useState(null);
  const [selectImageValue, setSelectImageValue] = useState("");
  const [croppedImageUrl, setCroppedImageUrl] = useState(user.photoURL);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [name, setName] = useState(user.displayName);

  const onChangeFile = (e) => {
    setSrc(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files[0]);
  };

  //ModalCropperの処理
  const onClickClose = () => {
    setSrc(null);
    setSelectImageValue("");
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(src, croppedAreaPixels);
      console.log("donee", { croppedImage });
      setCroppedImageUrl(croppedImage);
      let blobImage = await fetch(croppedImage).then((r) => r.blob());
      setCroppedImage(blobImage);
      setSrc(null);
      setSelectImageValue("");
    } catch (e) {
      console.error(e);
    }
  }, [src, croppedAreaPixels]);
  //ここまでModalCropperの処理

  //フォーム送信時の処理
  //   const onEditProfileSubmit = (e) => {
  //     e.preventDefault();
  //     const EditProfileId = firebase.firestore().collection("rooms").doc();
  //     EditProfileId.set({
  //       name: roomName,
  //       deleteKey: deleteKey,
  //     });
  //     setRoomName("");
  //     setDeleteKey("");
  //     setEditProfile(false);
  //   };

  return (
    <>
      {src && (
        <ModalCropper
          src={src}
          onClickClose={onClickClose}
          onCropComplete={onCropComplete}
          showCroppedImage={showCroppedImage}
        />
      )}
      <EditProfileWrap>
        <EditProfile>
          <StyledCloseIcon onClick={onClickCloseEditProfile} />
          <EditProfileForm
          //   onSubmit={onEditProfileSubmit}
          >
            <div className="input-image-wrap">
              <IconUp>
                <span>
                  <img src={croppedImageUrl} alt="ユーザーアイコン" />
                </span>
                <input
                  type="file"
                  value={selectImageValue}
                  name="avatar"
                  id="avatar"
                  onChange={onChangeFile}
                />
              </IconUp>
            </div>
            <div className="form-input">
              <p>名前</p>
              <input
                type="text"
                name="room-name"
                id="room-name"
                required="required"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <Button variant="contained">メールアドレスを変更する</Button>
            <Button variant="contained">パスワードを変更する</Button>
            <StyledSubmitButton
              className="signup"
              variant="contained"
              type="submit"
            >
              保存
            </StyledSubmitButton>
          </EditProfileForm>
        </EditProfile>
      </EditProfileWrap>
    </>
  );
};

const EditProfileWrap = styled.section`
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

const EditProfile = styled.div`
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

const EditProfileForm = styled.form`
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

const IconUp = styled.label`
  cursor: pointer;
  input {
    display: none;
  }
  span {
    display: inline-block;
    position: relative;
    :before {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      content: "";
      display: inline-block;
      background-color: black;
      height: 11.5vw; //22rem;
      width: 11.5vw; //22rem;
      opacity: 0.32;
      border-radius: 50%;
    }
    :after {
      content: "";
      height: 11.5vw; //22rem;
      width: 11.5vw; //22rem;
      display: inline-block;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 3;
      background-image: url(${iconMask});
      background-size: contain;
    }
  }
  img {
    border-radius: 50%;
    height: 11.5vw; //22rem;
    width: 11.5vw; //22rem;
  }
`;
