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
    <li>
      <img style={{ width: "100px" }} src={avatar} alt="" />
      <br />
      {user} : {content}
      <br />
      {year}/{month}/{date} {hour}:{min}
    </li>
  );
};

//画像は直接firestoreに保存することはできない。
// firestorage → firestore
