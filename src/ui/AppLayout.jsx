import { Outlet } from "react-router";
import Heading from "./Heading";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled, { css } from "styled-components";
import ProtectedRoute from "./ProtectedRoute";
const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  height: 100vh;
  grid-template-rows: auto 1fr;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  gap: 3.2rem;
  flex-direction: column;
`;

function AppLayout() {
  return (
    <ProtectedRoute>
      <StyledAppLayout>
        <Sidebar />
        <Header />
        <Main>
          <Container>
            <Outlet />
          </Container>
        </Main>
      </StyledAppLayout>
    </ProtectedRoute>
  );
}

export default AppLayout;
