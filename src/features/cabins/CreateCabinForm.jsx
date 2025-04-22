import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCabin as createCabinAPI,
  editCabin as editCabinAPI,
} from "../../services/apiCabins";
import toast from "react-hot-toast";
import StyledFormRow from "../../ui/FormRow";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id, ...cabinData } = cabinToEdit;
  const isEditSession = Boolean(id);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? cabinData : {},
  });

  const { errors } = formState;
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createCabinAPI,
    onSuccess: () => {
      toast.success("New Cabin Successfully Created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ id, data }) => editCabinAPI(id, data),
    onSuccess: () => {
      toast.success("Cabin Edited Successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const isOperationInProgress = isCreating || isEditing;

  function onSubmit(data) {
    console.log(data);
    isEditSession
      ? editCabin({ id, data })
      : createCabin({ ...data, image: data.image?.[0] });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
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
