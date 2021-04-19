import styled from "styled-components";

export const Item = ({
  user,
  content,
  avatar,
  year,
  month,
  date,
  min,
  hour,
}) => {
  return (
    <SMessageList>
      <SUserIcon src={avatar} alt="ユーザーアイコン" />
      <SUserNameMessageWrap>
        <p className="user-name">{user}</p>
        <div className="message-balloon">
          <p className="user-message">{content}</p>
        </div>
      </SUserNameMessageWrap>
      <SDateWrap>
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
  display: flex;
  padding: calc(16 / 1920 * 100vw);
  font-family: "ヒラギノ角ゴシック";
  color: #5f6c7b;
`;

const SUserIcon = styled.img`
  width: calc(145 / 1920 * 100vw);
  height: calc(145 / 1920 * 100vw);
  border-radius: 50%;
`;

const SUserNameMessageWrap = styled.div`
  margin-left: calc(16 / 1920 * 100vw);
  padding-top: calc(34 / 1920 * 100vw);
  .user-name {
    font-size: calc(30 / 1920 * 100vw);
    margin-bottom: calc(18 / 1920 * 100vw);
  }
  .message-balloon {
    max-width: calc(520 / 1920 * 100vw);
    display: inline-block;
    position: relative;
    margin-left: calc(13 / 1920 * 100vw);
    padding: calc(24 / 1920 * 100vw);
    border-radius: calc(12 / 1920 * 100vw);
    background: #d8e2ef;
    :after {
      content: "";
      display: inline-block;
      position: absolute;
      top: calc(-15 / 1920 * 100vw);
      left: calc(-26 / 1920 * 100vw);
      border: calc(12 / 1920 * 100vw) solid transparent;
      border-right: calc(30 / 1920 * 100vw) solid #d8e2ef;
      transform: rotate(45deg);
    }
  }
  .user-message {
    font-size: calc(25 / 1920 * 100vw);
    line-height: calc(30 / 1920 * 100vw);
  }
`;

const SDateWrap = styled.div`
  font-size: calc(20 / 1920 * 100vw);
  margin-top: auto;
  margin-left: calc(13 / 1920 * 100vw);
  line-height: calc(30 / 1920 * 100vw);
  opacity: 0.75;
`;
