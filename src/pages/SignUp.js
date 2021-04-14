import React, { useState, useCallback } from "react";
import firebase from "../config/firebase";
import styled from "styled-components";
import iconDefault from "../img/icon_default.png";
import iconMask from "../img/icon-mask.png";
import Logo from "../img/logo.png";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import Cropper from "react-easy-crop";
import getCroppedImg from "../cropImage";
import CloseIcon from "@material-ui/icons/Close";

export const SignUp = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [selectImageValue, setSelectImageValue] = useState("");
  const [croppedImageUrl, setCroppedImageUrl] = useState(iconDefault);

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

  const onChangeFile = (e) => {
    setSrc(URL.createObjectURL(e.target.files[0]));
    setAvatar(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const onClickClose = () => {
    setSrc(null);
    setAvatar(null);
    setSelectImageValue("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const iconRef = firebase
      .storage()
      .ref()
      .child("user-image/" + avatar.name);
    console.log(avatar);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        iconRef
          .putString(croppedImage.substring(23), "base64")
          .then((snapshot) => {
            iconRef.getDownloadURL().then((url) => {
              console.log(url);
              user.updateProfile({
                displayName: name,
                photoURL: url,
              });
              history.push("/");
            });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Header>
        <h1>
          <span>
            <img src={Logo} alt="logo" />
          </span>
          -Bond
        </h1>
      </Header>
      <SignUpFormWrap>
        <h2>新規登録</h2>
        <SignUpForm>
          <form onSubmit={handleSubmit}>
            <div className="input-image-wrap">
              <IconUp>
                <span>
                  <img src={croppedImageUrl} alt="デフォルトアイコン" />
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
            {src && (
              <ModalCropperWrap>
                <ModalCropper>
                  <CloseIcon onClick={onClickClose} />
                  <div className="cropper-wrap">
                    <Cropper
                      image={src}
                      crop={crop}
                      zoom={zoom}
                      aspect={1}
                      cropShape="round"
                      onCropChange={setCrop}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                    />
                  </div>
                  <div className="slider-wrap">
                    <Slider
                      value={zoom}
                      min={1}
                      max={3}
                      step={0.1}
                      aria-labelledby="Zoom"
                      onChange={(e, zoom) => setZoom(zoom)}
                      classes={{ root: "slider" }}
                    />
                  </div>
                  <Button
                    className="cropper-ok"
                    variant="contained"
                    onClick={showCroppedImage}
                  >
                    OK
                  </Button>
                </ModalCropper>
              </ModalCropperWrap>
            )}
            <div className="input-wrap">
              <input
                type="name"
                name="name"
                id="name"
                value={name}
                placeholder="ユーザー名"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-wrap">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                placeholder="メールアドレス"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-wrap">
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                placeholder="パスワード"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button className="signup" variant="contained" type="submit">
              新規登録
            </Button>
          </form>
        </SignUpForm>
      </SignUpFormWrap>
    </>
  );
};

const Header = styled.section`
  background-color: #094067;
  height: 5.15vw;
  color: #fffffe;
  font-family: Montserrat;
  font-size: 2.3vw; //4.4rem;
  line-height: 2.8vw; //5.4rem;
  display: flex;
  align-items: center;
  padding: 1.35vw 0 1.35vw 3.28vw; // 2.6rem 0 2.6rem 6.3rem;
  img {
    height: 2vw; //3.9rem;
    transform: translate(-8%, 11%);
  }
`;

const SignUpFormWrap = styled.section`
  color: #5f6c7b;
  width: 68.2vw; //= 1309 / 1920
  margin: 4.6vw auto; //8.9rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    font-family: "ヒラギノ丸ゴ ProN";
    font-size: 3.9vw; //7.5rem;
    color: #7a92a3;
    margin-bottom: 1.77vw; //3.4rem;
  }
`;

const SignUpForm = styled.div`
  height: 35.1vw; //674px;
  width: 48%;
  border: 1px solid #90b4ce;
  border-radius: 0.78vw; //1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.82vw 0; //3.5rem 0;
  .input-image-wrap {
    margin-bottom: 1.3vw; //2.5rem;
  }
  h3 {
    font-size: 1.87vw; //3.6rem
    margin-bottom: 4.3vw; //8.2rem;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    .input-wrap {
      input {
        width: 21.9vw; //430/1920
        height: 3.43vw; //6.6rem;
        border-radius: 0.62vw; //1.2rem;
        border: 1px solid #707070;
        padding-left: 1.5vw; //2.9rem;
        font-family: "ヒラギノ丸ゴ ProN";
        font-size: 1.15vw; //2.2rem;
        ::placeholder {
          color: rgba(95, 108, 123, 0.56);
        }
      }
      margin-bottom: 1.5vw; //2.9rem;
      :nth-of-type(4) {
        margin-bottom: 0;
      }
    }

    .signup {
      margin: 1.25vw 0 1.98vw 0; //2.4rem 0 3.8rem 0;
      background-color: #ef4565;
      color: #fff;
      font-size: 1.8vw; //3.5rem;
      border-radius: 0.62vw; //1.2rem;
      width: 11.4vw; //21.9rem;
      height: 3.9vw; //7.5rem;
      font-family: "ヒラギノ丸ゴ ProN";
      font-weight: normal;
      line-height: 3.1vw; //6rem;
      :hover {
        background-color: #dc004e;
      }
    }
  }
  button {
    font-size: 1.3vw; //2.5rem;
    color: #5f6c7b;
    padding: 0;
  }
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

const ModalCropperWrap = styled.div`
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

const ModalCropper = styled.div`
  z-index: 5;
  height: 45.6vw; //87.5rem;
  width: 40.2vw; //77.2rem;
  border-radius: 3.4vw; //6.5rem;
  background-color: #fff;

  .MuiSvgIcon-root {
    font-size: 2.6vw; //5rem;
    margin: 2.1vw 2.86vw 0 0; //4rem 5.5rem 0 0;
    float: right; 
    cursor: pointer;
    color: #EF4565;
  }

  .cropper-wrap {
    position: relative;
    height: 25.62vw; //49.2rem;
    width: 25.62vw; //49.2rem;
    margin: 6.25vw auto 2.38vw; //12rem auto 4.57rem;
    .reactEasyCrop_Container {
      height: 100%;
      width: 100%;
      object-fit: contain;
      img {
        height: 26vw; //50rem;
      }
      div {
        height: 100%;
        width: 100%;
      }
    }
  }

  .slider-wrap {
    width: 50%;
    margin: 0 auto;
  }

  .cropper-ok {
    display: block;
    margin: 2.4vw auto 0; //4.6rem auto 0;
    background-color: #ef4565;
      color: #fff;
      font-size: 1.8vw; //3.5rem;
      border-radius: 0.62vw; //1.2rem;
      width: 11.4vw; //21.9rem;
      height: 3.9vw; //7.5rem;
      font-family: "ヒラギノ丸ゴ ProN";
      font-weight: normal;
      line-height: 3.1vw; //6rem;
      :hover {
        background-color: #dc004e;
      }
    }
  }
`;
