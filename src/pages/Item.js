import { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../AuthServise";

export const Item = ({
  user,
  content,
  avatar,
  year,
  month,
  date,
  min,
  userId,
  hour,
}) => {
  const nowUser = useContext(AuthContext);
  if (userId === nowUser.uid) {
  } else {
  }
  return (
    <SMessageList userId={userId} nowUserId={nowUser.uid}>
      <SUserIcon src={avatar} alt="ユーザーアイコン" />
      <SUserNameMessageWrap userId={userId} nowUserId={nowUser.uid}>
        <p className="user-name">{user}</p>
        <div className="message-balloon">
          <p className="user-message">{content}</p>
        </div>
      </SUserNameMessageWrap>
      <SDateWrap userId={userId} nowUserId={nowUser.uid}>
        <p className="YMD">
          {year}/{month}/{date}
        </p>
        <p className="HM">
          {hour}:{min}
        </p>
      </SDateWrap>
    </SMessageList>
  );
};

//画像は直接firestoreに保存することはできない。
// firestorage → firestore

const SMessageList = styled.li`
  flex-direction: ${({ userId, nowUserId }) =>
    userId === nowUserId ? "row-reverse" : "row"};
  display: flex;
  padding: calc(16 / 1920 * 100vw);
  font-family: "ヒラギノ角ゴ ProN W3", "HiraKakuProN-W3", "ヒラギノ角ゴ Pro W3",
    "HiraKakuPro-W3", "メイリオ", Meiryo;
  color: #5f6c7b;
  width: 100%;
`;

const SUserIcon = styled.img`
  width: calc(145 / 1920 * 100vw);
  height: calc(145 / 1920 * 100vw);
  border-radius: 50%;
`;

const SUserNameMessageWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: calc(34 / 1920 * 100vw);
  align-items: ${({ userId, nowUserId }) =>
    userId === nowUserId ? "flex-end" : "flex-start"};
  margin-right: ${({ userId, nowUserId }) =>
    userId === nowUserId ? "calc(16 / 1920 * 100vw)" : "none"};
  margin-left: ${({ userId, nowUserId }) =>
    userId === nowUserId ? "none" : "calc(16 / 1920 * 100vw)"};
  .user-name {
    font-size: calc(30 / 1920 * 100vw);
    margin-bottom: calc(18 / 1920 * 100vw);
  }
  .message-balloon {
    display: inline-block;
    position: relative;
    margin-right: ${({ userId, nowUserId }) =>
      userId === nowUserId ? "calc(13 / 1920 * 100vw)" : "none"};
    margin-left: ${({ userId, nowUserId }) =>
      userId === nowUserId ? "none" : "calc(13 / 1920 * 100vw)"};
    padding: calc(24 / 1920 * 100vw);
    border-radius: calc(12 / 1920 * 100vw);
    background: #d8e2ef;
    :after {
      content: "";
      display: inline-block;
      position: absolute;
      top: calc(-15 / 1920 * 100vw);
      left: ${({ userId, nowUserId }) =>
        userId === nowUserId ? "none" : "calc(-26 / 1920 * 100vw)"};
      right: ${({ userId, nowUserId }) =>
        userId === nowUserId ? "calc(-26 / 1920 * 100vw)" : "none"};
      border: calc(12 / 1920 * 100vw) solid transparent;
      border-right: calc(30 / 1920 * 100vw) solid #d8e2ef;
      transform: ${({ userId, nowUserId }) =>
        userId === nowUserId ? "rotate(135deg)" : "rotate(45deg)"};
    }
  }
  .user-message {
    white-space: pre-wrap;
    font-size: calc(25 / 1920 * 100vw);
    line-height: calc(30 / 1920 * 100vw);
  }
`;

const SDateWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ userId, nowUserId }) =>
    userId === nowUserId ? "flex-end" : "flex-start"};
  font-size: calc(20 / 1920 * 100vw);
  margin-top: auto;
  margin-right: ${({ userId, nowUserId }) =>
    userId === nowUserId ? "calc(13 / 1920 * 100vw)" : "none"};
  margin-left: ${({ userId, nowUserId }) =>
    userId === nowUserId ? "none" : "calc(13 / 1920 * 100vw)"};
  line-height: calc(30 / 1920 * 100vw);
  opacity: 0.75;
`;
