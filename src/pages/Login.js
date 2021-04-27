import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import { AuthContext } from "../AuthServise";
import firebase from "../config/firebase";
import styled from "styled-components";
import Logo from "../img/logo.png";
import btnGoogle from "../img/btn_google.png";
import btnTwitter from "../img/btn_twitter.png";
import Button from "@material-ui/core/Button";
import { ModalForgetPassword } from "./ModalForgetPassword";

export const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openForget, setOpenForget] = useState(false);

  const onClickResetPassword = () => {
    setOpenForget(true);
  };

  const user = useContext(AuthContext);
  if (user) {
    return <Redirect to={"/"} />;
  }

  const onClickTwitter = () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onClickGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
        window.alert("メールアドレスかパスワードが間違っています");
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
      <LoginForm>
        <h2>ログイン</h2>
        <LoginWrap>
          <LoginExNewWrap>
            <LoginEx>
              <h3>外部アカウントでログイン</h3>
              <Button
                variant="contained"
                className="btn-google"
                onClick={onClickGoogle}
              >
                <span>
                  <img src={btnGoogle} alt="google-logo" />
                </span>
                Googleで新規登録/ログイン
              </Button>
              <Button
                variant="contained"
                className="btn-twitter"
                onClick={onClickTwitter}
              >
                <span>
                  <img src={btnTwitter} alt="twitter-logo" />
                </span>
                Twitterで新規登録/ログイン
              </Button>
            </LoginEx>
            <LoginNew>
              <p>または</p>
              <Button
                variant="contained"
                className="btn-new"
                onClick={() => {
                  history.push("/signup");
                }}
              >
                <span>
                  <img src={Logo} alt="google-logo" />
                </span>
                メールアドレスで新規登録
              </Button>
            </LoginNew>
          </LoginExNewWrap>
          <LoginMail>
            <h3>メールアドレスでログイン</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  className="input-mail"
                  type="email"
                  value={email}
                  id="email"
                  name="email"
                  placeholder="メールアドレス"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  className="input-password"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="パスワード"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button variant="contained" type="submit">
                ログイン
              </Button>
              <br />
            </form>
            <Button onClick={onClickResetPassword}>
              パスワードを忘れた方はこちらから
            </Button>
          </LoginMail>
        </LoginWrap>
      </LoginForm>
      {openForget && <ModalForgetPassword setForget={setOpenForget} />}
    </>
  );
};

const Header = styled.section`
  background-color: #094067;
  height: 5.15vw;
  color: #fffffe;
  font-family: "Montserrat", sans-serif;
  font-size: calc(44 / 1920 * 100vw);
  line-height: calc(54 / 1920 * 100vw);
  display: flex;
  align-items: center;
  padding: calc(26 / 1920 * 100vw) 0 calc(26 / 1920 * 100vw)
    calc(63 / 1920 * 100vw);
  img {
    height: calc(39 / 1920 * 100vw);
    transform: translate(-8%, 11%);
  }
`;

const LoginForm = styled.section`
  color: #5f6c7b;
  width: 68.2vw; //= 1309 / 1920
  margin: calc(89 / 1920 * 100vw) auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    font-family: "ヒラギノ丸ゴ Pro W4", "ヒラギノ丸ゴ Pro",
      "Hiragino Maru Gothic Pro", "HG丸ｺﾞｼｯｸM-PRO", "HGMaruGothicMPRO",
      "Montserrat", sans-serif;
    font-size: calc(75 / 1920 * 100vw);
    color: #7a92a3;
  }
`;

const LoginWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: calc(54 / 1920 * 100vw);
`;

const LoginExNewWrap = styled.div`
  color: #5f6c7b;
  width: 48%;
  height: calc(674 / 1920 * 100vw);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LoginMail = styled.div`
  height: calc(674 / 1920 * 100vw);
  width: 48%;
  border: 1px solid #90b4ce;
  border-radius: calc(15 / 1920 * 100vw);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: calc(78 / 1920 * 100vw) 0;
  h3 {
    font-size: calc(36 / 1920 * 100vw);
    margin-bottom: calc(82 / 1920 * 100vw);
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
      width: 21.9vw; //430/1920
      height: calc(75 / 1920 * 100vw);
      border-radius: calc(12 / 1920 * 100vw);
      border: 1px solid #707070;
      padding-left: calc(29 / 1920 * 100vw);
      font-family: "ヒラギノ丸ゴ Pro W4", "ヒラギノ丸ゴ Pro",
        "Hiragino Maru Gothic Pro", "HG丸ｺﾞｼｯｸM-PRO", "HGMaruGothicMPRO";
      font-size: calc(22 / 1920 * 100vw);
      ::placeholder {
        color: rgba(95, 108, 123, 0.56);
      }
    }
    .input-mail {
      margin-bottom: calc(33 / 1920 * 100vw);
    }

    button {
      margin: calc(55 / 1920 * 100vw) 0;
      background-color: #ef4565;
      color: #fff;
      font-size: calc(35 / 1920 * 100vw);
      border-radius: calc(12 / 1920 * 100vw);
      width: calc(219 / 1920 * 100vw);
      height: calc(75 / 1920 * 100vw);
      font-family: "ヒラギノ丸ゴ Pro W4", "ヒラギノ丸ゴ Pro",
        "Hiragino Maru Gothic Pro", "HG丸ｺﾞｼｯｸM-PRO", "HGMaruGothicMPRO";
      font-weight: normal;
      line-height: calc(60 / 1920 * 100vw);
      :hover {
        background-color: #dc004e;
      }
    }
  }
  button {
    font-size: calc(25 / 1920 * 100vw);
    color: #5f6c7b;
    padding: 0;
  }
`;

const LoginEx = styled.div`
  background-color: rgba(144, 180, 206, 0.3);
  border-radius: calc(15 / 1920 * 100vw);
  width: 100%;
  padding: calc(78 / 1920 * 100vw) 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    font-size: calc(36 / 1920 * 100vw);
    margin-bottom: calc(43 / 1920 * 100vw);
  }
  button {
    font-family: "ヒラギノ丸ゴ Pro W4", "ヒラギノ丸ゴ Pro",
      "Hiragino Maru Gothic Pro", "HG丸ｺﾞｼｯｸM-PRO", "HGMaruGothicMPRO",
      "Montserrat", sans-serif;
    height: calc(75 / 1920 * 100vw);
    font-size: calc(22 / 1920 * 100vw);
    border: 0;
    border-radius: calc(12 / 1920 * 100vw);
    width: 68%; //430/628
    text-align: right;
    line-height: calc(75 / 1920 * 100vw);
    padding: 0;
    letter-spacing: 0;
    text-transform: none;
    :after {
      transform: translate(-17.4vw, 0);
      vertical-align: middle;
      content: "";
      display: inline-block;
      width: 1px;
      height: 2.96vw;
    }
    img {
      width: 2.37vw;
      vertical-align: middle;
      margin-right: 2.8vw;
    }
  }
  .btn-google {
    color: #5f6c7b;
    margin-bottom: 1.7vw;
    background-color: #fff;
    :hover {
      background-color: #f0eaea;
    }
    :after {
      background-color: #707070;
    }
  }
  .btn-twitter {
    color: #fff;
    background-color: #1d9bf0;
    :after {
      background-color: #fff;
    }
    :hover {
      background-color: #1976d2;
    }
  }
`;

const LoginNew = styled.div`
  padding: 2.2vw 0;
  width: 100%;
  border: 1px solid #90b4ce;
  border-radius: 0.78vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-size: 1.15vw;
    margin-bottom: 1.56vw;
    :before,
    :after {
      content: "";
      height: 1px;
      width: 8vw;
      background-color: #707070;
      display: inline-block;
      vertical-align: middle;
      margin: 0 1.4vw; //0 27px;
    }
  }
  button {
    height: 3.9vw;
    font-size: 1.14vw;
    border: 0;
    border-radius: 0.62vw;
    width: 68%; //430/628
    padding: 0;
    padding-right: 1vw;
    letter-spacing: 0;
    text-transform: none;
    text-align: right;
    line-height: 3.91vw;
    :hover {
      background-color: #90b4ce;
    }
    :after {
      transform: translate(-16.4vw, 0);
      vertical-align: middle;
      content: "";
      display: inline-block;
      width: 1px;
      height: 2.96vw;
    }
    img {
      width: 2.1vw;
      vertical-align: middle;
      margin-right: 3vw;
    }
  }
  .btn-new {
    color: #ffffff;
    background-color: #094067;
    :after {
      background-color: #ffffff;
    }
  }
`;
