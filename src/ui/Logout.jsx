import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useLogout } from "../features/authentication/useLogout";
import SpinnerMini from "./SpinnerMini";
function Logout() {
  const { logout, loading } = useLogout();
  return (
    <ButtonIcon onClick={() => logout()} disabled={loading}>
      {loading ? (
        <SpinnerMini />
      ) : (
        <HiArrowRightOnRectangle></HiArrowRightOnRectangle>
      )}
    </ButtonIcon>
  );
}

export default Logout;
