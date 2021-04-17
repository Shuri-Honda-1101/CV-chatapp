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
  padding: 1.6rem;
  font-family: "ヒラギノ角ゴシック";
  color: #5f6c7b;
`;

const SUserIcon = styled.img`
  width: 14.5rem;
  height: 14.5rem;
  border-radius: 50%;
`;

const SUserNameMessageWrap = styled.div`
  margin-left: 1.6rem;
  padding-top: 3.4rem;
  .user-name {
    font-size: 3rem;
    margin-bottom: 1.8rem;
  }
  .message-balloon {
    max-width: 52rem;
    display: inline-block;
    position: relative;
    margin-left: 1.3rem;
    padding: 2.4rem;
    border-radius: 12px;
    background: #d8e2ef;
    :after {
      content: "";
      display: inline-block;
      position: absolute;
      top: -15px;
      left: -26px;
      border: 12px solid transparent;
      border-right: 30px solid #d8e2ef;
      transform: rotate(45deg);
    }
  }
  .user-message {
    font-size: 2.5rem;
    line-height: 3rem;
  }
`;

const SDateWrap = styled.div`
  font-size: 2rem;
  margin-top: auto;
  margin-left: 1.3rem;
  line-height: 3rem;
  opacity: 0.75;
`;
