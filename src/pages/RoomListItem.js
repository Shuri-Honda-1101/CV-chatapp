import styled from "styled-components";
import Button from "@material-ui/core/Button";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

export const RoomListItem = ({ roomName }) => {
  return (
    <RoomName>
      <StyledButton>
        <StyledArrowForwardIosIcon />
        {roomName}
      </StyledButton>
    </RoomName>
  );
};

const RoomName = styled.li`
  margin: 4.2rem 1.6rem;
`;

const StyledButton = styled(Button)`
  font-size: 3.1rem;
  color: #5f6c7b;
  width: 100%;
  font-weight: normal;
  line-height: 3.1rem;
  text-transform: inherit;
  padding: 0;
  font-family: "ヒラギノ丸ゴ ProN";
  justify-content: start;
`;

const StyledArrowForwardIosIcon = styled(ArrowForwardIosIcon)`
  font-size: 2.1rem;
  vertical-align: middle;
  margin-right: 10px;
`;
