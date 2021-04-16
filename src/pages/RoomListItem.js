import styled from "styled-components";
import Button from "@material-ui/core/Button";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

export const RoomListItem = ({
  roomName,
  setOpenDeleteKey,
  index,
  setRoomDeleteKey,
  setRoomIndex,
  deleteKey,
}) => {
  //ルーム選択時の処理
  const onClickRoomButton = () => {
    setRoomIndex(index);
  };
  //削除ボタンクリック時の処理
  const onClickRoomDelete = () => {
    setOpenDeleteKey(true);
    setRoomIndex(index);
    setRoomDeleteKey(deleteKey);
  };
  return (
    <RoomName>
      <StyledButton onClick={onClickRoomButton} className="room-item_btn">
        <StyledArrowForwardIosIcon />
        {roomName}
        <StyledRemoveCircleIcon
          className="room-item_delete"
          onClick={onClickRoomDelete}
        />
      </StyledButton>
    </RoomName>
  );
};

const RoomName = styled.li``;

const StyledButton = styled(Button)`
  padding: 4.2rem 1.6rem;
  font-size: 3.1rem;
  color: #5f6c7b;
  height: 9.8rem;
  width: 100%;
  font-weight: normal;
  line-height: 3.1rem;
  text-transform: inherit;
  font-family: "ヒラギノ丸ゴ ProN";
  justify-content: start;
  :hover {
    .room-item_delete {
      display: block;
    }
  }
`;

const StyledArrowForwardIosIcon = styled(ArrowForwardIosIcon)`
  font-size: 2.1rem;
  vertical-align: middle;
  margin-right: 10px;
`;

const StyledRemoveCircleIcon = styled(RemoveCircleIcon)`
  color: #ef4565;
  cursor: pointer;
  font-size: 3.1rem;
  margin-left: auto;
  display: none;
`;
