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
  padding: calc(42 / 1920 * 100vw) calc(16 / 1920 * 100vw);
  font-size: calc(31 / 1920 * 100vw);
  color: #5f6c7b;
  height: calc(98 / 1920 * 100vw);
  width: 100%;
  font-weight: normal;
  line-height: calc(31 / 1920 * 100vw);
  text-transform: inherit;
  font-family: "ヒラギノ丸ゴ Pro W4", "ヒラギノ丸ゴ Pro",
    "Hiragino Maru Gothic Pro", "HG丸ｺﾞｼｯｸM-PRO", "HGMaruGothicMPRO";
  justify-content: start;
  :hover {
    .room-item_delete {
      display: block;
    }
  }
`;

const StyledArrowForwardIosIcon = styled(ArrowForwardIosIcon)`
  font-size: calc(21 / 1920 * 100vw);
  vertical-align: middle;
  margin-right: 10px;
`;

const StyledRemoveCircleIcon = styled(RemoveCircleIcon)`
  color: #ef4565;
  cursor: pointer;
  font-size: calc(31 / 1920 * 100vw);
  margin-left: auto;
  display: none;
`;
