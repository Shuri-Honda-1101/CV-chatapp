import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import { AuthContext } from "../AuthServise";
import firebase from "../config/firebase";
import styled from "styled-components";
import Logo from "../img/logo.png";
import btnGoogle from "../img/btn_google.png";
import btnTwitter from "../img/btn_twitter.png";
import Button from "@material-ui/core/Button";

export const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
            <Button>パスワードを忘れた方はこちらから</Button>
          </LoginMail>
        </LoginWrap>
      </LoginForm>
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

const LoginForm = styled.section`
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
  }
`;

const LoginWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 2.8vw; //5.4rem;
`;

const LoginExNewWrap = styled.div`
  color: #5f6c7b;
  width: 48%;
  height: 35vw; //674px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LoginMail = styled.div`
  height: 35.1vw; //674px;
  width: 48%;
  border: 1px solid #90b4ce;
  border-radius: 0.78vw; //1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4vw 0; //7.8rem 0;
  h3 {
    font-size: 1.87vw; //3.6rem
    margin-bottom: 4.3vw; //8.2rem;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
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
    .input-mail {
      margin-bottom: 1.7vw; //3.3rem;
    }

    button {
      margin: 2.86vw 0; //5.5rem 0;
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

const LoginEx = styled.div`
  background-color: rgba(144, 180, 206, 0.3);
  border-radius: 0.78vw; //1.5rem
  width: 100%;
  padding: 4.1vw 0; //7.8rem
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    font-size: 1.87vw; //3.6rem
    margin-bottom: 2.2vw; //4.3rem
  }
  button {
    font-family: "ヒラギノ丸ゴ ProN";
    height: 3.9vw; //7.5rem;
    font-size: 1.14vw; //2.2rem;
    border: 0;
    border-radius: 0.62vw; //1.2rem;
    width: 68%; //430/628
    text-align: right;
    line-height: 3.91vw; //7.5rem;
    padding: 0;
    letter-spacing: 0;
    text-transform: none;
    :after {
      transform: translate(-17.4vw, 0); //-29.8rem
      vertical-align: middle;
      content: "";
      display: inline-block;
      width: 1px;
      height: 2.96vw; //5.7rem;
    }
    img {
      width: 2.37vw; //4.55rem;
      vertical-align: middle;
      margin-right: 2.8vw;
    }
  }
  .btn-google {
    color: #5f6c7b;
    margin-bottom: 1.7vw; //3.3rem;
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
  padding: 2.2vw 0; //4.2rem 0;
  width: 100%;
  border: 1px solid #90b4ce;
  border-radius: 0.78vw; //1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-size: 1.15vw; //2.2rem;
    margin-bottom: 1.56vw; //3rem;
    :before,
    :after {
      content: "";
      height: 1px;
      width: 8vw; //15.4rem;
      background-color: #707070;
      display: inline-block;
      vertical-align: middle;
      margin: 0 1.4vw; //0 27px;
    }
  }
  button {
    height: 3.9vw; //7.5rem;
    font-size: 1.14vw; //2.2rem;
    border: 0;
    border-radius: 0.62vw; //1.2rem;
    width: 68%; //430/628
    padding: 0;
    padding-right: 1vw;
    letter-spacing: 0;
    text-transform: none;
    text-align: right;
    line-height: 3.91vw; //7.5rem;
    :hover {
      background-color: #90b4ce;
    }
    :after {
      transform: translate(-16.4vw, 0); //-29.8rem
      vertical-align: middle;
      content: "";
      display: inline-block;
      width: 1px;
      height: 2.96vw; //5.7rem;
    }
    img {
      width: 2.1vw; //4rem;
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
