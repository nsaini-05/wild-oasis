import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignUp } from "./useSignUp";
import toast from "react-hot-toast";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signUp, loading } = useSignUp();
  const { register, handleSubmit, getValues, formState, reset } = useForm();
  const { errors } = formState;

  const onSubmit = (values) => {
    const { fullName, email, password } = values;
    signUp(
      { fullName, email, password },
      {
        onSuccess: (data) => {
          reset();
        },
        onError: (error) => console.log(error.message),
      }
    );
  };
  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Full name">
        <Input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "This Field is Required",
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This Field is Required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please Provide Valid Email",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This Field is Required",
            minLength: {
              value: 8,
              message: "Passwords needs minimum 8 Characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This Field is Required",
            validate: (value) => {
              return (
                value === getValues().password ||
                "Both Passwords Should be Same"
              );
            },
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={loading}>
          Cancel
        </Button>
        <Button disabled={loading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
