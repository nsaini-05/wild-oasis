import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router";
import { useEffect } from "react";
const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // Load the Authenticated user
  const { loading, data, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !loading) navigate("/login");
  }, [isAuthenticated, loading]);

  if (loading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //Loading Spinner

  //No Authnticated User Redirect to Login Page
  if (isAuthenticated) return <div>{children}</div>;
}

export default ProtectedRoute;
