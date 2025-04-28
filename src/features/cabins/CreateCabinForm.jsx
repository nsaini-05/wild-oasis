import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useCreateCabin } from "./useCreateCabin";
import StyledFormRow from "../../ui/FormRow";
import { useEditCabin } from "./useEditCabin";
function CreateCabinForm({ cabinToEdit = {}, onClose }) {
  const { id, ...cabinData } = cabinToEdit;
  const isEditSession = Boolean(id);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? cabinData : {},
  });
  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();

  const { errors } = formState;

  const isOperationInProgress = isCreating || isEditing;

  function onSubmit(data) {
    !isEditSession
      ? createCabin(
          { ...data, image: data.image[0] },
          {
            onSuccess: (data) => {
              console.log(data);
              reset();
            },
          }
        )
      : editCabin(
          { id: id, data: { ...data } },
          {
            onSuccess: (data) => {
              reset();
              console.log(data);
            },
          }
        );
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onClose ? "modal" : "regular"}
    >
      <StyledFormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This Field is Required" })}
        />
      </StyledFormRow>

      <StyledFormRow
        label="Maximum Capacity"
        error={errors?.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This Field is Required",
            min: { value: 1, message: "Capacity Should be atleast one" },
          })}
        />
      </StyledFormRow>

      <StyledFormRow
        label="Regular Price"
        error={errors?.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", { required: "This Field is Required" })}
        />
      </StyledFormRow>

      <StyledFormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This Field is Required",
            validate: (value) =>
              Number(value) < Number(getValues().regularPrice) ||
              "Discount Should be less than Regular Price",
          })}
        />
      </StyledFormRow>

      <StyledFormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "This Field is Required" })}
        />
      </StyledFormRow>

      <StyledFormRow label="Cabin Photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </StyledFormRow>

      <StyledFormRow>
        <Button
          $variation="secondary"
          type="reset"
          disabled={isOperationInProgress}
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button $variation="primary" disabled={isOperationInProgress}>
          {isEditSession ? "Edit Cabin" : "Create Cabin"}
        </Button>
      </StyledFormRow>
    </Form>
  );
}

export default CreateCabinForm;
