import styled, { css } from "styled-components";
const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 30px;
    `}

  ${(props) => props.as === "h2" && "font-size: 18px ; color: yellow"}

  ${(props) => props.as === "h4" && "font-size: 3rem; text-align:center "}
`;

export default Heading;
