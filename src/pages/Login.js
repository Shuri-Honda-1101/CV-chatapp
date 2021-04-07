import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import { AuthContext } from "../AuthServise";
import firebase from "../config/firebase";
import styled from "styled-components";
import Logo from "../img/logo.png";

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
              <button className="btn-google" onClick={onClickGoogle}>
                Googleで新規登録/ログイン
              </button>
              <button className="btn-twitter" onClick={onClickTwitter}>
                Twitterで新規登録/ログイン
              </button>
            </LoginEx>
            <div>
              <p>または</p>
              <button
                onClick={() => {
                  history.push("/signup");
                }}
              >
                SignUpはコチラから
              </button>
            </div>
          </LoginExNewWrap>
          <LoginMail>
            <h3>メールアドレスでログイン</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  value={email}
                  id="email"
                  name="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit">Login</button>
              <br />
              <p>パスワードを忘れた方はこちらから</p>
            </form>
          </LoginMail>
        </LoginWrap>
      </LoginForm>
    </>
  );
};

const Header = styled.section`
  background-color: #094067;
  height: 9.1vh;
  color: #fffffe;
  font-family: Montserrat;
  font-size: 4.4rem;
  line-height: 5.4rem;
  display: flex;
  align-items: center;
  padding: 2.6rem 0 2.6rem 6.3rem;
  img {
    height: 3.9rem;
    transform: translate(-8%, 11%);
  }
`;

const LoginForm = styled.section`
  color: #5f6c7b;
  width: 68.2vw; //= 1309 / 1920
  margin: 8.9rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    font-family: "ヒラギノ丸ゴ ProN";
    font-size: 7.5rem;
    color: #7a92a3;
  }
`;

const LoginWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 5.4rem;
`;

const LoginExNewWrap = styled.div`
  color: #5f6c7b;
  width: 48%;
`;

const LoginMail = styled.div`
  width: 48%;
`;

const LoginEx = styled.div`
  background-color: rgba(144, 180, 206, 0.3);
  border-radius: 1.5rem;
  padding: 7.8rem 9.9rem;
  display: flex;
  flex-direction: column;
  h3 {
    font-size: 3.6rem;
    margin-bottom: 4.3rem;
  }
  button {
    height: 7.5rem;
    font-size: 2.2rem;
    border: 0;
    border-radius: 1.2rem;
  }
  .btn-google {
    color: #5f6c7b;
    margin-bottom: 3.3rem;
    background-color: #fff;
  }
  .btn-twitter {
    color: #fff;
    background-color: #1d9bf0;
  }
`;
