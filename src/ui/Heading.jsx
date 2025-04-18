import styled, { css } from "styled-components";
const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 30px;
      color: rebeccapurple;
    `}

  ${(props) => props.as === "h2" && "font-size: 18px ; color: yellow"}
`;

export default Heading;
