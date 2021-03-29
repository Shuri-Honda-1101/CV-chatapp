export const Item = ({ user, content, avatar }) => {
  return (
    <li>
      <img style={{ width: "100px" }} src={avatar} alt="" />
      <br />
      {user} : {content}
    </li>
  );
};

//画像は直接firestoreに保存することはできない。
// firestorage → firestore
