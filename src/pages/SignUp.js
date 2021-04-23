import React, { useState, useCallback } from "react";
import firebase from "../config/firebase";
import styled from "styled-components";
import Logo from "../img/logo.png";
import iconDefault from "../img/icon_default.png";
import iconMask from "../img/icon-mask.png";
import Button from "@material-ui/core/Button";
import { ModalCropper } from "./ModalCropper";
import getCroppedImg from "../cropImage";

export const SignUp = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [src, setSrc] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [selectImageValue, setSelectImageValue] = useState("");
  const [croppedImageUrl, setCroppedImageUrl] = useState(iconDefault);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  //画像選択
  const onChangeFile = (e) => {
    setSrc(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files[0]);
  };

  //新規登録ボタンクリック
  const handleSubmit = (e) => {
    e.preventDefault();
    const iconRef = firebase
      .storage()
      .ref()
      .child("user-image/" + email + "_icon.jpg");
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        user
          .sendEmailVerification()
          .then(() => {
            window.alert(`${email}に確認メールを送信しました`);
            iconRef
              .put(croppedImage)
              .then(() => {
                iconRef
                  .getDownloadURL()
                  .then((url) => {
                    user
                      .updateProfile({
                        displayName: name,
                        photoURL: url,
                      })
                      .then(() => {
                        history.push("/");
                      })
                      .catch((err) => {
                        console.log(err);
                        window.alert("プロフィールの作成に失敗しました");
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                    window.alert("アイコン画像の取得に失敗しました");
                  });
              })
              .catch((err) => {
                console.log(err);
                window.alert("画像をアップロード出来ませんでした");
              });
          })
          .catch((err) => {
            console.log(err);
            window.alert(`${email}に確認メールを送信できませんでした`);
          });
      })
      .catch((err) => {
        console.log(err);
        window.alert("アカウントの作成に失敗しました");
      });
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
              <ModalCropper
                src={src}
                onClickClose={onClickClose}
                onCropComplete={onCropComplete}
                showCroppedImage={showCroppedImage}
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
