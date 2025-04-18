import { Outlet } from "react-router";
import Heading from "./Heading";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled, { css } from "styled-components";

const Main = styled.main``;

function AppLayout() {
  return (
    <div>
      <Header />
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
