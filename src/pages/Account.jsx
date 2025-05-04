import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UserUpdateDataForm from "../features/authentication/UpdateUserDataForm";

function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Row $type="vertical">
        <Heading as="h3">Update user data</Heading>
        <UserUpdateDataForm></UserUpdateDataForm>
      </Row>

      <Row>
        <Heading as="h3">Update password</Heading>
        <p>Update user password form</p>
      </Row>
    </>
  );
}

export default Account;
