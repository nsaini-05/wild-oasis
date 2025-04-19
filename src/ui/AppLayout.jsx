import { Outlet } from "react-router";
import Heading from "./Heading";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled, { css } from "styled-components";

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 2rem 4rem;
`;

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  height: 100vh;
  grid-template-rows: auto 1fr;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Sidebar />
      <Header />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
