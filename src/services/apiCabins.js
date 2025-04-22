import supabase from "./supabase";
import { supabaseUrl } from "./supabase";
export const getCabins = async () => {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    throw new Error("Cabins could not loaded");
  }

  return data;
};

export const deleteCabin = async (id) => {
  const { error } = await supabase.from("cabins").delete().eq("id", Number(id));

  if (error) {
    throw new Error("Cabins could not be deleted");
  }
};

const generateNameAndPath = (newCabin) => {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images//${imageName}`;

  return [imageName, imagePath];
};

export const uploadImage = async (imageName, image, id) => {
  const { error: imageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, image);
  if (imageError) {
    try {
      await deleteCabin(id);
    } catch (deleteError) {
      console.error("Rollback failed: could not delete cabin", deleteError);
    }
    throw new Error(
      "Cabin Image Could not be uploaded and the cabin was not created"
    );
  }
};

export const createCabin = async (newCabin) => {
  const [imageName, imagePath] = generateNameAndPath(newCabin);

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single();

  if (error) {
    throw new Error("Cabin could not be created");
  }

  try {
    await uploadImage(imageName, newCabin.image, data.id);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const editCabin = async (id, cabinToEdit) => {
  console.log(cabinToEdit);
  const { data, error } = await supabase
    .from("cabins")
    .update({ ...cabinToEdit })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error("Cabin Cannot be Edited");
  }

  return data;
};
