import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UserUpdateDataForm from "../features/authentication/UpdateUserDataForm";
import UserUpdatePasswordForm from "../features/authentication/UpdatePasswordForm";

function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Row $type="vertical">
        <Heading as="h3">Update user data</Heading>
        <UserUpdateDataForm></UserUpdateDataForm>
      </Row>

      <Row $type="vertical">
        <Heading as="h3">Update password</Heading>
        <UserUpdatePasswordForm></UserUpdatePasswordForm>
      </Row>
    </>
  );
}

export default Account;
