import React, { useState, useCallback } from "react";
import firebase from "../config/firebase";
import styled from "styled-components";
import Logo from "../img/logo.png";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import Cropper from "react-easy-crop";
import getCroppedImg from "../cropImage";

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

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(src, croppedAreaPixels);
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
      // const fileReader = new FileReader()
      // const croppedImageBase64 =fileReader.readAsDataURL(croppedImage)
    } catch (e) {
      console.error(e);
    }
  }, [src, croppedAreaPixels]);

  const onChangeFile = (e) => {
    setSrc(URL.createObjectURL(e.target.files[0]));
    setAvatar(e.target.files[0]);
    console.log(e.target.files[0]);
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
              <label htmlFor="avatar">ユーザー画像</label>
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={onChangeFile}
              />
            </div>
            {src && (
              <CropperWrap>
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
              </CropperWrap>
            )}
            {src && (
              <Controls>
                <Slider
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e, zoom) => setZoom(zoom)}
                  classes={{ root: "slider" }}
                />
              </Controls>
            )}
            {src && <button onClick={showCroppedImage}>OK</button>}
            {croppedImage && (
              <img
                src={croppedImage}
                alt="プレビュー画像"
                style={{ borderRadius: "50%" }}
              />
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
            <Button variant="contained" type="submit">
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
    margin-bottom: 3.4rem;
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
  padding: 3.8rem 0;
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
        height: 3.9vw; //7.5rem;
        border-radius: 0.62vw; //1.2rem;
        border: 1px solid #707070;
        padding-left: 1.5vw; //2.9rem;
        font-family: "ヒラギノ丸ゴ ProN";
        font-size: 1.15vw; //2.2rem;
        ::placeholder {
          color: rgba(95, 108, 123, 0.56);
        }
      }
      margin-bottom: 1.7vw; //3.3rem;
      :nth-of-type(4) {
        margin-bottom: 0;
      }
    }

    button {
      margin: 4.6rem 0 3.8rem 0;
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

const CropperWrap = styled.div`
  height: 900px;
  width: 900px;
  position: relative;
`;

const Controls = styled.div`
  width: 900px;
`;
