import { BrowserRouter } from "react-router";
import { Routes, Route } from "react-router";
import { Navigate } from "react-router";
import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import User from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFounde from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000,
    },
  },
});
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
        <GlobalStyles></GlobalStyles>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout></AppLayout>}>
              <Route
                element={<Navigate replace to="dashboard"></Navigate>}
                index
              ></Route>
              <Route path="dashboard" element={<Dashboard />}></Route>
              <Route path="bookings" element={<Bookings />}></Route>
              <Route path="cabins" element={<Cabins />}></Route>
              <Route path="users" element={<User />}></Route>
              <Route path="settings" element={<Settings />}></Route>
              <Route path="account" element={<Account />}></Route>
            </Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="*" element={<PageNotFounde />}></Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
