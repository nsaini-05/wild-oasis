import styled, { css } from "styled-components";

const flexTypes = {
  horizontal: css`
    flex-direction: row;
    justify-content: space-between;
  `,
  vertical: css`
    flex-direction: column;
  `,
};

const Row = styled.div`
  display: flex;
  gap: 2rem;
  ${(props) => flexTypes[props.$type]};
`;

Row.defaultProps = { type: "horizontal" };
export default Row;
